function inputsToObject(inputs) {
  let newPersonInfo = {};
  for (const input of inputs) {
    let key = $(input).attr("name");
    let value = input.value;
    if (key === "avatar" && !value) {
      value = $(input).attr("value");
    } else {
      value = input.value.replace(/C:\\fakepath\\/, "");
    }
    if (!value.trim()) return alert("Invalid inputs.");
    newPersonInfo[key] = value;
  }
  return newPersonInfo;
}

function remove() {
  dataset = dataset.filter((el) => el.id !== Number(userid));
  userid = null;
  total_pages = Math.ceil(dataset.length / perpage);
  render();
}

function update() {
  let inputs = $("#profileModal .modal-body .update-input");
  let newPersonInfo = inputsToObject(inputs);
  if (!newPersonInfo) return null;
  delete newPersonInfo.id;
  dataset = dataset.map((el) => {
    if (el.id === Number(userid)) {
      return { ...el, ...newPersonInfo };
    }
    return el;
  });
  userid = null;
  render();
}

function create() {
  let inputs = $("#profileModal .modal-body .create-input");
  let newPersonInfo = inputsToObject(inputs);
  if (!newPersonInfo) return null;
  newPersonInfo.id = Number(newPersonInfo.id);
  dataset = [...dataset, newPersonInfo];
  total_pages = Math.ceil(dataset.length / perpage);
  render();
}
