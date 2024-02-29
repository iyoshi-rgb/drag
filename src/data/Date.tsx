import { v4 as uuidv4 } from "uuid";

const Data = [
  {
    id: uuidv4(),
    title: "Member",
    names: [
      {
        id: uuidv4(),
        name: '名前を追加してください'
      },
    ],
  },
];


export default Data ;
