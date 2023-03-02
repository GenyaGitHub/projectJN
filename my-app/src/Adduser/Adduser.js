import {Component} from "react";


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: props.name || '',
            username: props.username || '',
            phone: props.phone ||'',
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

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="name"
                        name="name"
                        value={name} 
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
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}




export default AddUser