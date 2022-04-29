# SAM-Monorepo

## Steps

- Install AWS CLI and AWS SAM CLI
- Configure the AWS CLI using `aws configure` (You need an AWS Account and an IAM user cred)
- run `sam build`
- run `sam deploy --guided` to deploy the components mentioned in the SAM template along with the code

- For CI/CD in the code build buildspec add the below lines

```
    sam build
    sam package --template-file template.yaml --output-template-file package.yml   --s3-bucket aws-sam-cli-managed-default-samclisourcebucket-1mwa7p5x8ix35`
    sam deploy --template-file package.yml --stack-name topfanslite  --capabilities CAPABILITY_IAM
```