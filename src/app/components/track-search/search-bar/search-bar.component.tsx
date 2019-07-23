import * as React from 'react'

import * as styles from './search-bar.styles.scss';

interface SearchBarProps {
  onSearchInputChange: Function
}

export class SearchBarComponent extends React.Component<SearchBarProps> {
  onSearchInputChange = (event) => {
    this.props.onSearchInputChange(event.target.value);
  }

  render() {
    return (
      <div className={styles['search-bar']}>
        <input className={styles['search-input']} onChange={this.onSearchInputChange}></input>
      </div>
    )
  }
}