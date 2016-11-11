# K.N.B.N
K.N.B.N is dedicated to make your daily task easier than ever. You can even customize your task and board to meet your needs!

## Apps Screenshot

### Landing Page
![alt text](https://raw.githubusercontent.com/blanford-fox-2016/knbn/master/client/img/landing_page.png "Landing Page")

### board
![alt text](https://raw.githubusercontent.com/blanford-fox-2016/knbn/master/client/img/board.png "Boards")

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

## Copyright

K.N.B.N is created with :love:
follow us on gitHub
- [Ahyana](https://www.github.com/ahyanarizky)
- [Juang](https://www.github.com/broerjuang)
- [Ryan](https://www.github.com/ryanandhaka)
- [Tama](https://www.github.com/tamatamvan)
