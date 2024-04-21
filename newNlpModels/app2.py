from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
import pickle
import nltk
import re
import string
import numpy as np
import os
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)


# Get the current directory of the script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Define the directory path where your model file is located relative to the current directory
models_directory = os.path.join(current_directory, 'models')




# Load GRU model and tokenizer
gru_model = load_model(os.path.join(models_directory, 'best_model_bi_gru.h5'))
tokenizer = pickle.load(open(os.path.join(models_directory, 'tokenizer.pickle'),'rb'))

# Load SVM model, vectorizer and encoder
svm_model = pickle.load(open(os.path.join(models_directory, 'svm_regression.pkl'),'rb'))
tfidf_vectorizer = pickle.load(open(os.path.join(models_directory, 'tfidfvectorizer.pkl'),'rb'))
lb = pickle.load(open(os.path.join(models_directory, 'label_encoder.pkl'),'rb'))



max_length = 50
nltk.download('stopwords')  # Downloading all the stopwords from the nltk library
pattern = re.compile('<.*?>')  # Pattern for removing the HTML tags
punctuation = string.punctuation   # Extracting all punctuation from the string library
ps = PorterStemmer()  # Creating a PorterStemmer object for the stemming purpose


def preprocess_text_gru(text):
    
    text = re.sub(pattern,'',text)  # Removing the HTML tags using re library

    text = text.lower()  # Lower case all the character present in the text

    text = text.translate(str.maketrans('','',punctuation))   # Removing all the punctuation from the text

    text = text.split()    # word tokenize the text

    text = [word.replace('rs', '') for word in text]

    text = [ps.stem(word) for word in text if word not in stopwords.words('english')]  # Removing the stopwords from the text and stem each word

    processed_text = ' '.join(text)

    text_to_sequence = tokenizer.texts_to_sequences([processed_text])[0]

    padded_sequence = pad_sequences([text_to_sequence],maxlen = max_length, padding = 'post')

    return padded_sequence
    


def preprocess_text_svm(text):
    
    text = re.sub("[^a-zA-Z]", " ",text)

    text = text.lower()

    text = text.split()

    text = [word.replace('rs', '') for word in text]

    text = [ps.stem(word) for word in text if word not in stopwords.words('english')]

    cleaned_text =  ' '.join(text)

    input_vectorizer = tfidf_vectorizer.transform([cleaned_text])

    return input_vectorizer



@app.route('/api/predict', methods=['POST'])
def predict():

    data = request.get_json()
    print(data)
    text = data['inputText']
    processed_text_gru = preprocess_text_gru(text)
    processed_text_svm = preprocess_text_svm(text)
    
    # Make predictions using the gru loaded model
    gru_psy_prediction = gru_model.predict(processed_text_gru)

    # Make predictions using the svm loaded model
    svm_cat_prediction = svm_model.predict(processed_text_svm)[0]
    predicted_emotion_cat = lb.inverse_transform([svm_cat_prediction])[0]    

    classes_psy = ['Aspiration Focused','Emotional Comfort','Essential Need','Experiential Investment','Impulse Buy','Mindful Spending','Routine Expense','Social Outlay']
    classes_cat = ['Bills & Utilities','Entertainment','Financial Services','Groceries & Dining','Healthcare','Housing','Others','Personal Care','Transportation']

    my_op_list = []
    my_op_list.append(classes_psy[np.argmax(gru_psy_prediction)])
    my_op_list.append(predicted_emotion_cat)
    

    # Format predictions as JSON response
    output_text = {'outputText': my_op_list}
    return jsonify(output_text)




if __name__ == '__main__':
    app.run(port=8000)
