import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import Passwords from '../Passwords'

class PasswordManager extends Component {
  state = {
    websiteText: '',
    usernameText: '',
    passwordText: '',
    userList: [],
    checkBox: false,
    searchPass: '',
  }

  deleteUserDetails = id => {
    const {userList} = this.state
    this.setState({
      userList: userList.filter(eachItem => eachItem.id !== id),
    })
  }

  OnChangeWebsite = event => {
    this.setState({websiteText: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameText: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordText: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {websiteText, usernameText, passwordText} = this.state

    const newList = {
      id: v4(),
      website: websiteText,
      username: usernameText,
      password: passwordText,
    }

    this.setState(prevState => ({
      userList: [...prevState.userList, newList],
      websiteText: '',
      usernameText: '',
      passwordText: '',
      listLength: prevState.listLength + 1,
    }))
  }

  renderPswdContainer = () => {
    const {websiteText, usernameText, passwordText} = this.state

    return (
      <div className="addPswdContainer">
        <div className="addPswd">
          <h1 className="heading">Add New Password</h1>
          <form onSubmit={this.onClickAddButton}>
            <div className="inputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="inputImage"
              />
              <input
                type="text"
                value={websiteText}
                className="inputBox"
                placeholder="Enter Website"
                onChange={this.OnChangeWebsite}
              />
            </div>
            <div className="inputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="inputImage"
              />
              <input
                type="text"
                value={usernameText}
                className="inputBox"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="inputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="inputImage"
              />
              <input
                type="password"
                value={passwordText}
                className="inputBox"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="addButton">
                Add
              </button>
            </div>
          </form>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="imageSizing"
        />
      </div>
    )
  }

  searchPassword = event => {
    this.setState({searchPass: event.target.value})
  }

  checkBoxClicked = () => {
    this.setState(prevState => ({
      checkBox: !prevState.checkBox,
    }))
  }

  renderNotFoundContainer = () => (
    <div className="notFoundContainer">
      <img
        className="image2"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  renderPasswordContainer = searchResults => {
    const {checkBox} = this.state

    return (
      <ul className="uListContainer">
        {searchResults.map(eachItem => (
          <Passwords
            key={eachItem.id}
            onChange={this.onChangeSearchInput}
            userDetails={eachItem}
            checkBoxClicked={this.checkBoxClicked}
            deleteUserDetails={this.deleteUserDetails}
            checkBox={checkBox}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {userList, searchPass} = this.state
    const searchResults = userList.filter(eachDestination =>
      eachDestination.website.toLowerCase().includes(searchPass.toLowerCase()),
    )
    const listLength = searchResults.length
    console.log(searchResults)

    return (
      <div className="bgContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appLogo"
        />
        {this.renderPswdContainer()}
        <div className="displayPswdContainer">
          <div className="headerContainer">
            <div className="countContainer">
              <h1 className="card2Head">Your Passwords</h1>
              <p className="length">{listLength}</p>
            </div>
            <div className="searchContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchLogo"
              />
              <input
                type="search"
                onChange={this.searchPassword}
                className="searchBox"
              />
            </div>
          </div>
          <div className="showPassword">
            <input type="checkbox" id="check" onClick={this.checkBoxClicked} />
            <label className="showPasswordText" htmlFor="check">
              Show passwords
            </label>
          </div>

          <hr />
          {listLength >= 1
            ? this.renderPasswordContainer(searchResults)
            : this.renderNotFoundContainer()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
