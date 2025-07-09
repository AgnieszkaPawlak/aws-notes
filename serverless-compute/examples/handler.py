def handler_name (event, contex):
    print("Received event: ",  event)
    result = {"message": "Hello, World!"}
    return {
        "statusCode": 200,
        "body": result
    }