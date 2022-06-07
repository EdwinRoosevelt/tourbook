


const postToDB = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      response = await response.json();
      return response
      
    } catch (err) {
      console.log(err.message);
      return err;
    }
}

export default postToDB