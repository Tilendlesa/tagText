#encoding=utf8
from flask import Flask, render_template, request
#f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
import json
import os
from flask import jsonify
filename = "information.json"
app = Flask(__name__)
#app.config['UPLOAD_FOLDER'] = os.getcwd() + '/static' 
@app.route('/')
def upload():

    return render_template('mark.html',filetext="请选择文件")
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        global filename 
        filename = f.filename.split(".")[0]
        suffix = f.filename.split(".")[1]
        if suffix=="txt":
            text = bytes.decode(f.read())
            if len(text)>10000:
                return render_template('mark.html',filetext="字数超过10000字,请重新选择文件")
            else:
                with open(filename+".txt","w",encoding="utf8",newline="") as f:
                    f.write(text)
                return render_template('mark.html',filetext=text)
        else:
            return render_template('mark.html',filetext="请选择TXT格式的文件")
@app.route('/getjson', methods = ['GET', 'POST'])
def	getjson():
    if request.method=='POST':
        text = request.get_json() #获取字典格式
        for items in text:
            for i in range(len(text[items])): 
                text[items][i][0] = text[items][i][0].replace("\n","")
        with open(filename+".json","w",encoding="utf8") as f:
            json.dump(text,f,ensure_ascii=False,indent = 2)
        return jsonify(text)
    return "error"
if __name__ == '__main__':
   app.run()