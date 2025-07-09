# Create Lambda function from ZPI

aws lambda create-function \
--region us-east-2 \
--function name myExampleFunction \
--role arn:aws:iam:account-id:role/role_name \
--runtime python3.12 \
--handler MyExampleFunction.my_handler \
--zip-file fileb://path/to/function/file.zip

# Update Lambda function from ZIP

aws lambda update-function-code \
--function name myExampleFunction \
--zip-file fileb://path/to/function/file.zip

# Invoke Lambda function from ZIP

aws lambda invoke \
--function name myFunctionExample \
-- payload '{ "key1": "value1"}' \
response.json

# Get account concurrency settings

aws lambda get-account-settings

