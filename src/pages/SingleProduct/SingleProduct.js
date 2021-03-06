/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../utils/firebaseConfig';
import './SingleProduct.css';
import { UserContext } from '../../context/UserProvider';
import { useAlert } from 'react-alert';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const SingleProduct = (props) => {
  const { isSignedIn } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const namo = props.match.params.name;
  const [language, setLanguage] = useState([]);
  const [availabel, setAvailabel] = useState();
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [ids, setIds] = useState();
  const [image, setImage] = useState();
  const alert = useAlert();

  useEffect(() => {
    const mentor = firebase.database().ref('user').child(`${id}`);

    mentor.on('value', (snapshot) => {
      setProduct(snapshot.val());
      setLanguage(snapshot.val().language);
      setSkills(snapshot.val().skill);
      setName(snapshot.val().name);
      setImage(snapshot.val().image);
      setAvailabel(snapshot.val().disponibility);
    });
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const mentor = firebase
        .database()
        .ref('mentor')
        .child(firebase.auth().currentUser.uid)
        .child(namo);

      mentor.on('value', (snapshot) => {
        let previousList = snapshot.val();
        setIds(previousList);
        setValue(!!previousList);
      });
    }
  }, [name]);
  function choose() {
    let count = availabel - 1;
    setAvailabel(count);
    const mentor = {
      userId: firebase.auth().currentUser.uid,
      name: name,
      id: `${id}`,
      skill: skills,
      language: language,
      image: image,
      abo: firebase.auth().currentUser.displayName,
      abomail: firebase.auth().currentUser.email,
      photo: firebase.auth().currentUser.photoURL,
    };

    firebase
      .database()
      .ref('mentor')
      .child(name)
      .child(firebase.auth().currentUser.uid)
      .set(mentor);
    const abo = {
      userId: firebase.auth().currentUser.uid,
      name: name,
      id: `${id}`,
      skill: skills,
      language: language,
      image: image,
      abo: firebase.auth().currentUser.displayName,
      abomail: firebase.auth().currentUser.email,
      photo: firebase.auth().currentUser.photoURL,
    };

    firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid)
      .child(name)
      .set(abo);
  }

  return (
    <div>
      <div
        className='product-center'
        key={product.id}
        style={{ marginTop: '80px' }}
      >
        <img className='prod-photo' src={product.image} alt={product.name} />
        <section className='content-prod'>
          <div className='title_name'>
            <h2>{product.name}</h2>

            <h5>@{product.nationality}</h5>
          </div>
          <Box
            component='fieldset'
            mb={3}
            borderColor='transparent'
            marginBottom='0'
            padding='0'
          >
            <Rating name='read-only' value={product.value} readOnly />
          </Box>
          <p>{product.reviews} reviews</p>
          <h5 className='price-prod' style={{ marginBottom: '40px' }}>
            {product.activity}
          </h5>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            {language.map((el) => (
              <p
                key={el}
                className='tag'
                style={{
                  backgroundColor: 'var(--primaryColor)',
                  color: 'white',
                  padding: '10px',
                  marginRight: '10px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                {el}
              </p>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              marginBottom: '40px',
            }}
          >
            {skills.map((el) => (
              <span
                key={el}
                style={{
                  border: '1px solid rgba(119, 119, 119, 0.65)',
                  color: 'var(--primaryDarkColor)',
                  borderRadius: '3px',
                  fontSize: '11px',
                  padding: '5px 12px',
                  margin: '4px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                {el}{' '}
              </span>
            ))}
          </div>
          <p className='description'>{product.description}</p>

          <hr />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              margin: '20px',
            }}
          >
            {' '}
            <p
              style={{
                margin: '0 20px 0 0',
              }}
            >
              availability:
            </p>
            <a
              style={{
                backgroundColor: 'var(--primaryDarkColor)',
                color: 'white',
                padding: '10px',
                marginRight: '10px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              {availabel}/5
            </a>
          </div>
          {value && ids.id != 1 ? (
            <button type='button' className='btnWait' disabled={true}>
              Waiting for approbation
            </button>
          ) : value && id == 1 ? (
            <button type='button' className='btnAlready' disabled={true}>
              Already in your program
            </button>
          ) : isSignedIn === false ? (
            <button
              type='button'
              className='btnChoose'
              onClick={() =>
                alert.show(
                  'You must be logged in to add a mentor in your program'
                )
              }
            >
              Choose this mentor
            </button>
          ) : (
            <button
              type='button'
              className='btnChoose'
              onClick={choose}
              disabled={isSignedIn ? false : true}
            >
              Choose this mentor
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default SingleProduct;
