

export const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};


export const patch = async (url, values) => {
  console.log("url bên apiHelper",url)
  const init = {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "TOKEN",
    },
    body: JSON.stringify(values),
  };
  const response = await fetch(url, init);
  console.log("response bên api patch",response)

  // check lỗi 
  if (!response.ok) {
    // message.error(response.status, response.statusText)
    console.log(response.status)
  }
  const data = await response.json();
  return data;
};

export const post = async (url, values) => {
  
  console.log("url",url)
  console.log("values",values)

  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  const response = await fetch(url, options);

  console.log("response",response)
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Trả về đối tượng phản hồi
  return response;
};

export const deleteItem = async (url) => {
  const deleteMethod = {
    method: "DELETE", // Method itself
    mode: "cors", // Chế độ CORS
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, deleteMethod);
  const data = await response.json();

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Trả về đối tượng phản hồi
  return response;
};

export const put = async (url, values) => {
  const options = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Trả về đối tượng phản hồi
  return response;
};

export const putV2 = async (url, values) => {
  const options = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Trả về đối tượng phản hồi
  const data = await response.json();
  return data;
};