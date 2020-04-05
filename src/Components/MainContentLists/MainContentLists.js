import React from 'react';
import ListItem from '../ListItem/ListItem';
import Button from '../Button/Button';
import { dataBaseRefUsers, dataBaseRefLists } from '../../api.js';
import './MainContentLists.css';
import {
    withRouter
} from 'react-router-dom'

class MainContentLists extends React.Component {
    constructor() {
        super()
        this.state = {
            lists: []
        }
        this.retriveLists = this.retriveLists.bind(this);
        this.initLists = this.initLists.bind(this);
    }

    componentDidMount() {
        this.retriveLists();
    }

    render() {
        let lists = this.state.lists.map((item, idx) =>
            <div 
                className="list" 
                key={item.id} onClick={() => { this.props.history.push('/protected/' + item.id) }}
            >
                <ListItem 
                    key={item.id}
                    item={item}
                />
            </div>
        )
        return (
            <div>
                <div>
                    {lists}
                </div>
                <div className="button-slot-lists">
                    <Button 
                        text="Add Todo" 
                        handleClick={this.handleShowModalAddUpdate}
                    />
                </div>
            </div>
        )
    }

    retriveLists() {
        let lists = [];
        dataBaseRefUsers.doc(localStorage.getItem('idUser')).get().then(doc => {
            doc.data().lists.forEach(idList => {
                dataBaseRefLists.doc(idList).get().then(list => {
                    lists.push({
                        id: idList,
                        name: list.data().name
                    });
                    this.initLists(lists);
                });
            });
        })
    }

    initLists(lists) {
        this.setState(prevState => {
            let newState = prevState;
            newState.lists = lists;
            return newState;
        })
    }
}

export default withRouter(MainContentLists)