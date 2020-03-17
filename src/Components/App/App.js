import React from 'react'
import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'

class App extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <MainContent />
            </div>
        )
    }
}

export default App