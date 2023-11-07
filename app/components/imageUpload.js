//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

// create a component
const ImageUploader = (props) => {
  const [profileImage, setProfileImage] = useState('');
  const { token } = props.route.params;

  const openImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };
  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImage,
      type: 'image/jpg',
    });
    try {
      const res = await client.post('/upload-profile', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        props.navigation.dispatch(StackActions.replace('AppForm'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openImage} style={styles.uploadImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Text style={styles.imageText}>Upload Profile Picture</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.skipBtn}>Skip</Text>
        {profileImage ? (
          <Text
            onPress={uploadProfileImage}
            style={[
              styles.skipBtn,
              { backgroundColor: 'green', color: 'white', borderRadius: 8 },
            ]}
          >
            Upload
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  uploadImage: {
    height: 175,
    width: 175,
    borderRadius: 175 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.5,
    fontWeight: 'bold',
  },
  skipBtn: {
    textAlign: 'center',
    padding: 11,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    opacity: 0.9,
  },
});

//make this component available to the app
export default ImageUploader;
