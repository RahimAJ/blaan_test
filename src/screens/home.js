import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFS from 'react-native-fs';
import base64 from 'react-native-base64';
import utf8 from 'utf8';
import blaanDownloadIcon from '../../assets/img/chant_1DasalBagoMatulog.png';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      fileExist: false,
      percentage: 0,
    }
  }

  componentDidMount = async () => {
     /* Re-Attaching to background downloads
    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
    for (let task of lostTasks) {
      console.log(`Task ${task.id} was found!`);
      task.progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
      }).done(() => {
        console.log('Download is done!');
      }).error((error) => {
        console.log('Download canceled due to error: ', error);
      });
    }

    END of Re-Attaching to background downloads */

    console.log('-- APPLICATION STARTED --');
    if (await RNFS.exists(RNBackgroundDownloader.directories.documents + "/dasalBagoMatulog.mp4")){
      console.log('componentDidMount: File is found');
      this.setState({fileExist: true, percentage: 'Download Completed'});
      console.log(this.state.fileExist);
    } else {
      console.log('componentDidMount: File is not Found');
      console.log(this.state.fileExist);
    }
  }

  renderOverlay  = () => {
    if (this.state.fileExist){
      console.log('renderOverlay cond: 1');
      return(
        <View>
          <Text>
            PLAY VIDEO
          </Text>
        </View>
      )
    } else {
      console.log('renderOverlay cond: 2');
      return(
        <View>
          <Text>
            FILE IS MISSING
          </Text>
        </View>
      )
    }
  }

  renderDownloadPercent = () => {
    return(
      <View>
        <Text>
          Download%: {this.state.percentage}
        </Text>
      </View>
    )
  }

  playPress = async () => {
    if (await RNFS.exists(RNBackgroundDownloader.directories.documents + "/dasalBagoMatulog.mp4")){
      this.props.navigation.navigate('Play');
    } else {
      this.downloadTest();
    }
  }

  downloadTest = () => {
      alert('DOWNLOADING FILE');
      console.log('test');
      let CLIENT_ID = 'm6d-UEtpXbFgB6%Ghm_y#^Lx<!m.bZkt'
      let CLIENT_SECRET = 'U6aRgx*-7xzUGnhp$^DJ92WGJ=z8U%D!'
      let AUTH_TOKEN = base64.encode(utf8.encode(CLIENT_ID + ':' + CLIENT_SECRET));
  
      let task_1 = RNBackgroundDownloader.download({
        id: 'blaantest',
        url: 'https://cdn.smartonecampus.com/blaan/cultureandartsVideos/Chants/dasalBagoMatulog.mp4',
        destination: `${RNBackgroundDownloader.directories.documents}/dasalBagoMatulog.mp4`,
        headers: {
          Authorization: 'Basic ' + AUTH_TOKEN,
          Accept: '*/*',
          Connection: 'keep-alive',
      }
    }).begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      }).progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
        this.setState({percentage: (percent * 100)});
      }).done(() => {
        this.setState({fileExist: true, percentage: 'Download Completed'});
        console.log('Download is done!');
      }).error((error) => {
        alert('PLEASE CONNECT TO THE INTERNET!');
        console.log('Download canceled due to error: ', error);
      });

      let task_2 = RNBackgroundDownloader.download({
        id: 'blaantest',
        url:
          'https://cdn.smartonecampus.com/blaan/cultureandartsVideos/Chants/dasalBagoMatulog.mp4',
        destination: `${
          RNBackgroundDownloader.directories.documents
        }/dasalBagoMatulog.mp4`,
        headers: {
          Authorization: 'Basic ' + AUTH_TOKEN,
          Accept: '*/*',
          Connection: 'keep-alive',
        },
      })
        .begin(expectedBytes => {
          console.log(`Going to download ${expectedBytes} bytes!`);
        })
        .progress(percent => {
          console.log(`Downloaded: ${percent * 100}%`);
          this.setState({percentage: percent * 100});
        })
        .done(() => {
          this.setState({
            fileExist: true,
            percentage: 'Download Completed',
          });
          console.log('Download is done!');
        })
        .error(error => {
          alert('PLEASE CONNECT TO THE INTERNET!');
          console.log('Download canceled due to error: ', error);
        });


  
      // console.log(AUTH_TOKEN);
      // console.log(RNBackgroundDownloader.directories.documents);
      
      // // Pause the task
      // task.pause();
      
      // // Resume after pause
      // task.resume();
      
      // // Cancel the task
      // task.stop();

  }

  deleteTest = () => {
    var path = RNBackgroundDownloader.directories.documents + "/dasalBagoMatulog.mp4";

    return RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
        this.setState({fileExist: false, percentage: 0});
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
    });
  }

  render(){
    return(
    <View style={styles.container}>
      <TouchableOpacity onPress={this.deleteTest}>
        <Text>
          Delete File Test
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.playPress}>
        <Image
          style={styles.icon}
          source={blaanDownloadIcon}
        />  
        {this.renderDownloadPercent()}
        {this.renderOverlay()}
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  }
});
