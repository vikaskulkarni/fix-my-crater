import React, { PropTypes as T } from 'react'
import classnames from 'classnames';
import Item from '../Item/Item';
import './styles.scss';

export class Listing extends React.Component {
    render() {
        return (
            <div>
                {this.props.places.map(place => {
                    return (
                        <Item place={place}
                            onClick={this.props.onClick}
                            key={place.lat} />
                    )
                })}
            </div>
        )
    }
}

export default Listing