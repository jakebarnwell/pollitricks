import os
from flask import Flask, render_template
import utils
 
app = Flask(__name__)      
 
@app.route('/')
def home():
	voting_data = utils.get_voting_data(load_file=os.getcwd() + "/app/static/resources/random-data.csv")
	return render_template('demo.html', voting_data=voting_data)
 
if __name__ == '__main__':
	app.run(debug=True)