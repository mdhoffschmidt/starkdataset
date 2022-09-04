# StarkDataset

Repository for the StarkDataset hackathon in Warsaw.

## 1. Goal of the project.

The goal of the project is to create a distributed database for annotating Tweets using Starknet.
All the data is stored on chain. More specificaly :
1. Each dataset is a NFT ERC721 collection
2. Each annotation is a ERC721 Token.

## 2. Problem solved and use case.

The problem we solve here is making it possible for individuals to collectively build transparent and valuable datasets.
The use case we target is the development of Deep Learning models for Natural Language Processing or NLP applications.

Indeed, as most of the credit in the Deep Learning space has come from developing models. 
However we notice today that the model structure becomes very standardized.
It is especially the case for Transformers based models.
As models have standardized, few research was performed on trying to improve the data part.
Everyone want to do the model work but no one wants to do the data work. 
Therefore, the next place where innovation will take place in the Machine Learning space is Datasets.

Using blockchain, we solve the following problems :
1. Immutable database
2. Distributed and always available datbase
3. Database that rewards ownership of data using the NFT Technology to give credit to the users.

## 3. Technical details.

A tweet is characterized as a 'sentence' with a 'label'. 
Together they form a structured sample writen in the ERC721 Token.
Within the contract we use a Struct to express an annotation.
Both the sentence and label are expressed as felt type.

Note here that for the current contract, the felt type limits the number of characters to 31.
As it is not a problem for the label field, it is a problem for the sentence field.
Further work is required to takle that limitation.

## 4. Getting started.

First instal the dependencies of the project.
Start creating a virtualenv.

```bash
virtualenv cairo-venv -p python3.7
```

Then source the environment,

```bash
source cairo-venv/bin/activate
```

Finaly, install the dependencies using,

```bash
pip install -r requirements.txt
```

## 5. Deploy the contract.

First, let's compile the code using,

```bash
starknet-compile contracts/TokenDataset.cairo --output compiled/TokenDataset.json
```

Second, let's deploy it using,

```bash
starknet deploy \
    --contract compiled/TokenDataset.json \
    --inputs 'collection name as integer' 'symbol as integer' 'address as hex' \
    --network alpha-goerli \
    --no_wallet
```

You are now ready to create your Tweet database and annotate it !

## 5. Further steps and improvements.

* Create a string type
* Link to a frontend
