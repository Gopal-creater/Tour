class UserController {
  getAllUsers(req, res) {
    res.status(200).json({
      status: "error",
      message: "Not yet defined",
    });
  }

  getUser(req, res) {
    res.status(200).json({
      status: "error",
      message: "Not yet defined",
    });
  }

  createUser(req, res) {
    res.status(200).json({
      status: "error",
      message: "Not yet defined",
    });
  }

  updateUser(req, res) {
    res.status(200).json({
      status: "error",
      message: "Not yet defined",
    });
  }

  deleteUser(req, res) {
    res.status(200).json({
      status: "error",
      message: "Not yet defined",
    });
  }
}

// Exporting an instance of the UserController class
const userController = new UserController();
export default userController;
