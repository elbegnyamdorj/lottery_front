import SearchBox from '../search-box';
import CardList from '../card-list';
import { Component } from 'react';
import EdiText from 'react-editext';
import LoadingScreen from 'react-loading-screen';
import { getLotteryList } from '../../urls';
import axios from 'axios';
import './style.css';
export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      lottery_list: [],
      count: 0,
      searchField: '',
      noData: false,
    };
  }
  componentDidMount() {
    axios
      .get(getLotteryList)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ lottery_list: data.lottery });
        this.setState({ count: data.count });
        if (data) {
          this.setState({ noData: true });
        }
      });
  }
  onSave = (val) => {
    console.log('Edited Value -> ', val);
  };
  onSearchChanged = async (event) => {
    this.setState({ searchField: event });
    const result = await axios.get(getLotteryList + event.toString());
    this.setState({ lottery_list: result.data.lottery });
    this.setState({ count: result.data.count });
  };
  render() {
    const { lottery_list, count } = this.state;
    // const filteredList = lottery_list.filter((el) =>
    //   el.lottery_number.endsWith(searchField)
    // );
    // const slicedArray = filteredList.slice(0, 49);
    if (this.state.lottery_list.length > 0 || this.state.noData === true) {
      return (
        <div className='App'>
          <div style={{ height: '150px' }}>
            <EdiText
              editOnViewClick={true}
              submitOnEnter
              viewContainerClassName='title-style'
              viewProps={{ className: 'inner-text' }}
              showButtonsOnHover
              value=' '
              onSave={this.onSave}
            />
          </div>
          <SearchBox
            onSearch={this.onSearchChanged}
            digit={this.props.numOfinp}
          />
          <CardList
            lottery_list={lottery_list}
            number_of_lott={count}
            count={count}
          />
        </div>
      );
    } else {
      return (
        <LoadingScreen
          loading={true}
          bgColor='rgba(255,255,255,0.8)'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          logoSrc=''
          text='Loading...'
        ></LoadingScreen>
      );
    }
  }
}
