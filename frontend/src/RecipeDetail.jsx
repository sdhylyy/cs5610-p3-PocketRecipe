import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditableItem from './components/EditableItem';
import DeleteIcon from '@mui/icons-material/Delete';
import "./RecipeDetail.css"

export async function loader({ params }) {
  console.log("the id is", params.id)
  return {
    id: params.id,
  }
}

function RecipeDetail() {
  const data = useLoaderData()
  const id = data.id;

  const [detail, setDetail] = useState({})
  const [ifPublic, setIfPublic] = useState()
  const [favorited, setFavorited] = useState()

  const currUser = "wang"

  useEffect(() => {
    // get detail by id
    let requestAPI = `/item/detail?id=${id}&email=${currUser}`
    axios.get(requestAPI).then(
      res => {
        console.log(res.data.detail)
        setDetail(res.data.detail)
      }
    )
  }, [id, ifPublic, favorited])


  const togglePublic = () => {
    let requestAPI = "/item/pub"
    let target = !detail.public
    axios.post(requestAPI, {
      id: detail._id,
      public: target
    }).then(res => {
      setIfPublic(target)
    })
  }

  const toggleFavorite = () => {
    let requestAPI = "/item/fav"
    let target = !detail.favorite
    axios.post(requestAPI, {
      email: currUser,
      id: detail._id,
      favorite: target
    }).then(res => {
      setFavorited(target)
    })
  }



  return (
    <div id="recipe-detail">
      <div> <b>Recipe Detail: </b>
        {/* A recipes visibility CAN ONLY BE CHANGED when it belongs to current user */}
        <div>Visibility:
          {
            detail.user === currUser ? (
              detail.public ? (
                <button onClick={togglePublic}>Public</button>
              ) : (
                <button onClick={togglePublic}>Private</button>
              )
            ) : (
              detail.public ? (
                <div>Public</div>
              ) : (
                <div>Private</div>
              )
            )
          }
        </div>

        <div id="favorite-control" onClick={toggleFavorite}>
          {
            detail.favorite ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )
          }

        </div>
      </div>
      <div className="">
        <div className="">
          <EditableItem title={"Name"} defaultText={detail.name} />
        </div>

        <div>ID: {detail._id}</div>
        <div>Author: {detail.user}</div>
        <div className="">
          <EditableItem title={"Description"} defaultText={detail.description} />
        </div>

        <div className="">
          <EditableItem title={"Prep Time"} defaultText={detail.prepTime + " seconds"} />
        </div>

        <div>Ingrident:
          {
            detail.ingrident?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item} />
                <div className="delete-icon" key={i + "icon-wrapper"} >
                  <DeleteIcon key={i + "icon"} />
                </div>
              </div>
            )
          }
        </div>

        <div>Instruction:
          {
            detail.instruction?.map((item, i) =>
              <EditableItem key={i} title={i + 1} defaultText={item} />
            )
          }
        </div>

        <div>Nurtrition:
          {
            detail.nutrition?.map((item, i) =>
              <EditableItem key={i} title={i + 1} defaultText={item} />
            )
          }
        </div>
        <div>Tags:
          {
            detail.tags?.map((item, i) =>
              <EditableItem key={i} title={i + 1} defaultText={item} />)
          }
        </div>


      </div>

    </div >
  )
}

export default RecipeDetail