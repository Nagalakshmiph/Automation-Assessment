export const testData = {
  logInData: {
    userName: "Admin",
    password: "admin123",
    partialText: "adm",
    updatesUser: "UpdatedUser1"
  },
  negativeLogInData: [
    {
      testCase: "Invalid Username",
      userName: "WrongUser",
      password: "admin123",
      expectedError: "Invalid credentials"
    },
    {
      testCase: "Invalid Password",
      userName: "Admin",
      password: "wrongpass",
      expectedError: "Invalid credentials"
    },
    {
      testCase: "Empty Username and Password",
      userName: "",
      password: "",
      expectedError: "Required"
    },
    {
      testCase: "Empty Username",
      userName: "",
      password: "admin123",
      expectedError: "Required"
    },
    {
      testCase: "Empty Password",
      userName: "Admin",
      password: "",
      expectedError: "Required"
    },
    {
      testCase: "SQL Injection Attempt",
      userName: "' OR '1'='1",
      password: "' OR '1'='1",
      expectedError: "Invalid credentials"
    },
    {
      testCase: "Special Characters in Username",
      userName: "!@#$%^&*()",
      password: "admin123",
      expectedError: "Invalid credentials"
    }
  ],
  successMessages: {
    successfullySaved: "Successfully Saved",
    successfullyUpdated: "Successfully Updated",
    successfullyDeleted: "Successfully Deleted",
    noRecordsFound: "No Records Found"
  }
}
