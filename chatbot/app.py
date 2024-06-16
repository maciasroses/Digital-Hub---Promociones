# open virtual environment = source venv/bin/activate
# turn on the api = python3 app.py

from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_chatgpt_response(messages):
    response = openai.ChatCompletion.create(
        model='gpt-4',
        messages=messages
    )

    return response['choices'][0]['message']['content']

@app.route('/chatgpt/chat', methods=['POST'])
def getChatResponse():
    systemPrompt= {
        "messages":[
            {
                "role": "system",
                "content": "Eres un asistente que ayudas al cliente sobre sus dudas en cuanto a los descuentos, ademas tienes un asistente que te da contexto sobre las promociones. Por último, los precios son en pesos mexicanos."
            }
        ]
    }
    messages = request.json['messages']
    messages = systemPrompt["messages"] + messages
    model_response = get_chatgpt_response(messages)
    return {"data": model_response}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='3001', debug=True)

'''
{
    "messages": [
        {
            "role": "system",
            "content": "Eres un asistente que ayudas al cliente sobre sus dudas en cuanto a los descuentos, 
            ademas tienes un asistente que te da contexto sobre las promociones. "
        },
        {
            "role": "assistant",
            "content": "Promocion: por la compra de 5 Cajas de 24 cocacolas de 500 ml vidrio retornable, una caja gratis de fuze tea
                        negro limon 600ml pet"
        },
        {
            "role": "user",
            "content": "No entendi la promocion, explicamela, y que pasaria si compro 10 cajas"
        }
    ]
}


'''