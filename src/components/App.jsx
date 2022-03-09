import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoListEntry from './VideoListEntry.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';


// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <Search />
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video={ exampleVideoData[0] } />
//       </div>
//       <div className="col-md-5">
//         <VideoList videos={ exampleVideoData } />
//       </div>
//     </div>
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
  }

  componentDidMount() {
    this.getYouTubeVideos('cats');
  }

  getYouTubeVideos(query) {
    searchYouTube(query, (videos) =>
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      })
    );
  }


  onVideoTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search getYouTubeVideos={ this.getYouTubeVideos.bind(this) } />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={ this.state.currentVideo } />
          </div>
          <div className="col-md-5">
            <VideoList videos={ this.state.videos } onVideoTitleClick={ this.onVideoTitleClick.bind(this) } />
          </div>
        </div>
      </div>
    );
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
