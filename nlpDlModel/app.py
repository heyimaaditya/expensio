from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
import pickle
import nltk
import re
import string
import numpy as np
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)


# Load the trained Bi-LSTM model
model = load_model('C:\\Users\\HP\\Desktop\\hack36\\expensio\\nlpDlModel\\model\\bi_lstm_model.h5')

# Load the tokenizer
with open('C:\\Users\\HP\\Desktop\\hack36\\expensio\\nlpDlModel\\model\\tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

max_length = 50

## Perfoming the text preprocessing

nltk.download('stopwords')  # Downloading all the stopwords from the nltk library
pattern = re.compile('<.*?>')  # Pattern for removing the HTML tags
punctuation = string.punctuation   # Extracting all punctuation from the string library
ps = PorterStemmer()  # Creating a PorterStemmer object for the stemming purpose

def text_preprocess(text):

  text = re.sub(pattern,'',text)  # Removing the HTML tags using re library

  text = text.lower()  # Lower case all the character present in the text

  text = text.translate(str.maketrans('','',punctuation))   # Removing all the punctuation from the text

  text = text.split()    # word tokenize the text

  text = [word.replace('rs', '') for word in text]

  text = [ps.stem(word) for word in text if word not in stopwords.words('english')]  # Removing the stopwords from the text and stem each word

  return ' '.join(text)  # Join each word for the formation of clear text in string form



@app.route('/api/predict', methods=['POST'])
def predict():

    data = request.get_json()
    print(data)
    text = data['inputText']
    processed_text = text_preprocess(text)
    text_to_sequence = tokenizer.texts_to_sequences([processed_text])[0]
    padded_sequence = pad_sequences([text_to_sequence],maxlen = max_length, padding = 'post')

    # Make predictions using the loaded model
    prediction = model.predict(padded_sequence)    

    classes_psy = ['Aspiration Focused','Emotional Comfort','Essential Need','Experiential Investment','Impulse Buy','Mindful Spending','Routine Expense','Social Outlay']
    classes_cat = ['Bills & Utilities','Entertainment','Financial Services','Groceries & Dining','Healthcare','Housing','Others','Personal Care','Transportation']

    my_op_list = []
    my_op_list.append(classes_psy[np.argmax(prediction[0])])
    my_op_list.append(classes_cat[np.argmax(prediction[1])])
    


    # Format predictions as JSON response
    output_text = {'outputText': my_op_list}
    return jsonify(output_text)




if __name__ == '__main__':
    app.run(port=8000)
