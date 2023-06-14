import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { darkGreen, green } from './Constants';

const UserItem = ({ user, index, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
    };

    onUpdateUser(updatedUser, index);

    setIsEditing(false);
  };

  return (
    <View style={styles.userContainer}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editedName}
            onChangeText={setEditedName}
          />
          <TextInput
            style={styles.editInput}
            value={editedEmail}
            onChangeText={setEditedEmail}
          />
          <TouchableOpacity onPress={handleSave} style={styles.editButton}>
            <Text style={styles.editButtonText}>Update</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.userName}>Name: {user.name}</Text>
          <Text style={styles.userEmail}>Email: {user.email}</Text>
          <Text style={styles.userEmail}>Gender: {user.gender}</Text>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const UserProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public-api/users`)
      .then((res) => {
        setUsers(res.data.data);
        console.log("Users data:", res.data.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, []);

  const updateUser = (updatedUser, index) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = updatedUser;
      return updatedUsers;
    });
  };

  return (
    
    <FlatList
      data={users}
      renderItem={({ item, index }) => (
        <UserItem user={item} index={index} onUpdateUser={updateUser} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
   
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: darkGreen,
    
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
  },
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    color: '#fff'
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  editButtonText: {
    color: darkGreen,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;
