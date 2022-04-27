import Book from "./sendRequest";

const TEST_TEXT = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
  'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
  'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n' +
  'optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n' +
  'obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
  'nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
  'tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
  'quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos \n' +
  'sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam\n' +
  'recusandae alias error harum maxime adipisci amet laborum. Perspiciatis \n' +
  'minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit \n' +
  'quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur \n' +
  'fugiat, temporibus enim commodi iusto libero magni deleniti quod quam \n' +
  'consequuntur! Commodi minima excepturi repudiandae velit hic maxime\n' +
  'doloremque. Quaerat provident commodi consectetur veniam similique ad \n' +
  'earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo \n' +
  'fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore \n' +
  'suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium\n' +
  'modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam \n' +
  'totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam \n' +
  'quasi aliquam eligendi, placeat qui corporis!'

const testBook = new Book(TEST_TEXT)

test('book separates to array with 4000 symbols in every item', () => {
  testBook.separateBook()

  expect(testBook.separatedTxt).toEqual(
    expect.arrayContaining([expect.any(String)])
  );

  for (let i = 0; i < testBook.separatedTxt.length; i++) {
    expect(testBook.separatedTxt[i].length < 4000).toBeTruthy()
  }
})