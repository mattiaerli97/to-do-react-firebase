import React from 'react';
import ListItem from '../ListItem/ListItem';
import { dataBaseRefUsers, dataBaseRefLists } from '../../api.js';
import './MainContentLists.css';

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
            <ListItem 
                key={item.id}
                item={item}
            />
        )
        return (
            <div className="list">
                {lists}
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

export default MainContentLists