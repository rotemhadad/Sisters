import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { styles } from './styles';
import { collection, addDoc } from 'firebase/firestore';
import { firebaseConfig, db, app } from './FireBase';

function CreatePost(props) {
    // const [content, setContent] = useState('');
    // const [theme, setTheme] = useState('אחר');
    // const [isAnonymous, setIsAnonymous] = useState(false);

    // const handleCheckboxChange = () => {
    //     setIsAnonymous(!isAnonymous);
    // };

    // const handleSubmit = async () => {
    //     try {
    //         if (!props.img) {
    //             throw new Error('Author image URL is undefined');
    //         }

    //         addDoc(collection(db, 'Posts'), {
    //             author: isAnonymous ? 'Unknown' : props.name,
    //             date: new Date().toLocaleDateString('en-GB'),
    //             content,
    //             authorImg: props.img,
    //             likes: [],
    //             comments: [],
    //             theme,
    //         });

    //         console.log('Post added with ID:');
    //         Alert.alert('פוסט נוסף בהצלחה');

    //         // Clear the form fields after successful submission
    //         setContent('');
    //         setTheme('אחר');
    //         setIsAnonymous(false);
    //     } catch (error) {
    //         console.error('Error adding post:', error);
    //         Alert.alert('שגיאה', 'שגיאה בהוספת הפוסט');
    //     }
    // };

    // return (
    //     <div style={styles.postFormContainer}>
    //         <div style={styles.profilePicture}>
    //             <img src={props.img} alt="Profile" />
    //         </div>
    //         <div style={styles.postFormContent}>
    //             <div style={styles.anonymousButtonContainer}>
    //                 <label>
    //                     <input
    //                         type="checkbox"
    //                         name="isAnonymous"
    //                         id="isAnonymous"
    //                         checked={isAnonymous}
    //                         onChange={handleCheckboxChange}
    //                     />
    //                     <span></span>
    //                 </label>
    //                 <span>אנונימי</span>
    //             </div>
    //             <TextInput
    //                 value={content}
    //                 onChangeText={(text) => setContent(text)}
    //                 placeholder=" כתבי פה את מחשבותייך"
    //                 style={styles.textArea}
    //             />
    //             <br></br>
    //             <TouchableOpacity onPress={handleSubmit} style={styles.button}>
    //                 <Text>פרסום</Text>
    //             </TouchableOpacity>
    //         </div>
    //     </div>
    // );
}

// CreatePost.propTypes = {
//     name: PropTypes.string.isRequired,
//     img: PropTypes.string,
// };

// CreatePost.defaultProps = {
//     img: '..\Images\icons\Asset31.svg',
// };

export default CreatePost;
