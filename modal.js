const profileModalBody = $("#profileModal .modal-body")[0];
const profileModalFooter = $("#profileModal .modal-footer")[0];
let userid = null;

function inputsGenerator(targetUser, classname) {
  let inputsBody = "";
  for (const key in targetUser) {
    const value = targetUser[key];
    inputsBody += `<div class="mb-3">
        <label class="form-label">${key}</label>
        ${
          key === "avatar"
            ? `<input class="form-control form-control-sm ${classname}" name="${key}" value="${value}" type="file" />`
            : `<input type="text" class="form-control ${classname}" name="${key}" value="${value}" ${
                key === "id" ? "disabled" : ""
              } />`
        }
    </div>`;
  }
  return inputsBody;
}

function renderUserInfo(id) {
  userid = id;
  const targetUser = dataset.find((el) => el.id === Number(userid));
  let userInfoModalFooter = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button type="button" class="btn btn-warning" onclick="renderUpdateModal()">Edit</button>`;
  let userInfoModalBody = "";
  for (const key in targetUser) {
    const value = targetUser[key];
    userInfoModalBody += `<p><span>${key}</span> : <span>${value}</span></p>`;
  }
  $(profileModalBody).html(userInfoModalBody);
  $(profileModalFooter).html(userInfoModalFooter);
}

function renderUpdateModal() {
  const targetUser = dataset.find((el) => el.id === Number(userid));
  let updateModalFooter = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="update()">Update</button>
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="remove()">Delete</button>`;
  let updateModalBody = inputsGenerator(targetUser, "update-input");
  $(profileModalBody).html(updateModalBody);
  $(profileModalFooter).html(updateModalFooter);
}

function renderAddUserModal() {
  const targetUser = {
    id: Math.max(...dataset.map((el) => el.id)) + 1,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  };
  let addUserModalFooter = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="create()">Create</button>`;
  let addUserModalBody = inputsGenerator(targetUser, "create-input");
  $(profileModalBody).html(addUserModalBody);
  $(profileModalFooter).html(addUserModalFooter);
}
