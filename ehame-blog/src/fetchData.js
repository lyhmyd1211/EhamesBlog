export const post = async (url, body, callback) => {
  try {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
      body: JSON.stringify(
        body,
      ),
    });
    if (result) {
      //response.json()同样会返回一个Promise对象
      let responseJson = await result.json();
      callback(responseJson);
    } else {
      /**/
    }
  } catch (e) {
    //处理异常
    console.log(e);
  }

};
export const get = async (url, callback) => {
  try {
    let result = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    });
    if (result) {
      //response.json()同样会返回一个Promise对象
      let responseJson = await result.json();
      callback(responseJson);
    } else {
      /**/
    }
  } catch (e) {
    //处理异常
    console.log(e);
  }

};
// //使用的时候
// async function() {
//   var result = await test({ test: 1 })
//   console.log(result)
// }