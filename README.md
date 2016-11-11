# K.N.B.N
Project Phase 2 Third Week Blandford Fox

Knbn is dedicated to make your daily task easier than ever. You can even customize your task and board to meet your needs!

## Apps Screenshot

### Landing Page
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

### board
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

## Model

```js
const cardSchema = new Schema ({
  cardID: {type: Number, unique: true},
  title : { type : String, required : true},
  content : { type: String, required: true},
  due_date : { type: Date, required: true},
  status : { type: String, required: true},
  in_charge : {type : String, required: true}
})
```

## Endpoint
| Method   |      Routes        | Description   |
|:--------:|:------------------:|--------------:|
| GET      |  /api/cards        | Get all cards |
| POST     |  /api/cards        | Create a card |
| GET      |  /api/cards/:cardID| Get a cards   |
| PUT      |  /api/cards/:cardID| Update a card |
| DELETE   |  /api/cards/:cardID| Delete a card |
