import {Component} from "react";


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: props.name || '',
            username: props.username || '',
            phone: props.phone || '',
            city: props.city || ''
           
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
       
        this.props.onAdd({ name: this.state.name, username: this.state.username,phone: this.state.phone, address: {city: this.state.city}});
        this.setState({
            id: '',
            name: '',
            username: '',
            phone: '',
            city: ''
            
        })
    }
 
    render() {
        const { name, username, phone, city } = this.state;
        // console.log(this.props.s.editId)
        // const user = this.props.s.data.find(x => x.id.toString() === this.props.s.editI);
        // console.log(user)
        return (
            <div className="app-add-form">
               {this.props.onAdd ?  <h3>Add User</h3> : <h3>Update</h3>}
               
                <form
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="name"
                        name="name"
                        value={this.props.onAdd ? name : "a"}// `${user}`} 
                        onChange={this.onValueChange}/>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="username"
                        name="username"
                        value={username} 
                        onChange={this.onValueChange}/>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="phone"
                        name="phone"
                        value={phone} 
                        onChange={this.onValueChange}/>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="city"
                        name="city"
                        value={city} 
                        onChange={this.onValueChange}/>
                    <button type="submit"
                        className="btn btn-outline-light">{this.props.onAdd ? "Add" : "Update"}</button>
                </form>
            </div>
        )
    }
}




export default AddUser