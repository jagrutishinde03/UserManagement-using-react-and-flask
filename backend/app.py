from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

# Update the MongoDB connection string if necessary
client = MongoClient('mongodb://localhost:27017')

db = client['UserManagement']  # Database name

CORS(app)  # Enable CORS

@app.route('/users', methods=['POST', 'GET'])
def data():
    if request.method == 'POST':
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        emailID = body['emailID']

        db['users'].insert_one({
            "firstName": firstName,
            "lastName": lastName,
            "emailID": emailID
        })

        return jsonify({
            'status': 'Data is posted to mongoDB',
            'firstName': firstName,
            'lastName': lastName,
            'emailID': emailID
        })

    elif request.method == 'GET':
        allData = db['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            emailID = data['emailID']

            dataDict = {
                "id": str(id),
                "firstName": firstName,
                "lastName": lastName,
                "emailID": emailID
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/users/<string:id>',methods=['GET','PUT','DELETE'])
def onedata(id):

    if request.method == 'GET':
        data=db['users'].find_one({"_id":ObjectId(id)})
        id=data['_id']
        firstName=data['firstName']
        lastName=data['lastName']
        emailID=data['emailID']

        dataDict = {
            "id":str(id),
            "firstName": firstName,
            "lastName": lastName,
            "emailID": emailID
        }
        return jsonify(dataDict)

    if request.method == 'DELETE':
        db['users'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            "status":"Data id:" + id + "is deleted"
        })

    if request.method=='PUT':
        body=request.json
        firstName = body['firstName']
        lastName = body['lastName']
        emailID = body['emailID']

        db['users'].update_one({
            "_id":ObjectId(id)},
            {
                "$set":{
                    "firstName": firstName,
                    "lastName": lastName,
                    "emailID": emailID
                }
            }
        )

if __name__ == '__main__':
    app.debug = True
    app.run()
