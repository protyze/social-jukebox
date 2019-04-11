import firebase from "../firebase/Firebase";
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";

export class FindEvent extends Component {

    constructor(props) {
        super(props);

        const userId = localStorage.getItem("userId");
        this.db = firebase.firestore().collection('Events').where("userId", "==", userId);
    }

    state = {
        events: []
    };

    componentDidMount() {
        this.db.onSnapshot(this.onUpdate )
    }

    onUpdate = (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
            const { name } = doc.data();
            events.push({
                key: doc.id,
                name: name
            });
        });
        this.setState({events});
    };

    render() {

        return <div>
            <Container>
                <div className="button-container">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Header as='h1'>Choose an event</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='right'>
                                <Button basic><Link to={'/'}>Create new Event</Link></Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.events.map(event =>
                                    <Link to={`/event/${event.key}`} key={event.key}>
                                        <Segment>
                                            {event.name}
                                        </Segment>
                                    </Link>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
    }
}