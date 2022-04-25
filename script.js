3//let url = new URL("", baseurl)

let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15'
let thumbList = document.getElementById("thumbList")
let gameDetails = document.getElementById('gameDetails')
let gameDataList = []

fetch(url)
.then(res => res.json())
.then(data => {

  
  let sortedArr = data.sort((a,b) => {
    if (a.title > b.title)
      return 1
    else
      return -1
  })
  
  //console.log(sortedArr)
  //console.log(data[0].title)
  for(let i = 0; i < sortedArr.length; i++){
    // if(data[i].steamRatingPercent < 40)
    //   console.log(data[i].title)
    //console.log(data[i])
    gameDataList.push(sortedArr[i])
    
    let gameListing = document.createElement('li')
    thumbList.appendChild(gameListing)

    let gameTitle = document.createElement('h2')
    gameTitle.innerText = sortedArr[i].title

    gameTitle.style.width = "100%"
    gameListing.appendChild(gameTitle)
    
    let gameImg = document.createElement('img')
    gameImg.src = sortedArr[i].thumb
    gameImg.alt = sortedArr[i].title
    gameImg.style.width = "300px"
    gameListing.appendChild(gameImg)
    gameImg.addEventListener('click', gameSale)
  }
})
.catch(err => {
  console.log(`Error: ${err}`)
})



function gameSale(){
   thumbList.classList.toggle('hidden')
  console.log(this.src)
  let game = gameDataList.filter(element => element.thumb == this.src)
  console.log(game)
  let gameData = game[0]
 
  document.getElementById('gameTitle').innerText = gameData.title
  document.getElementById('gameImage').src = gameData.thumb

  let gameRatingText = document.getElementById('gameRatingText')
  
  gameRatingText.innerText = gameData.steamRatingText
    document.getElementById('gameRatingPercent').innerText = gameData.steamRatingPercent
   
  
  document.getElementById('originalGamePrice').innerText = "$" + gameData.normalPrice
  document.getElementById('saleGamePrice').innerText = "$" + gameData.salePrice
   document.getElementById('salePercent').innerText =     Math.floor(gameData.savings) + "% Savings"
 


  //Changes ReviewText Color Based On Review Percentage
  if(gameData.steamRatingPercent >= 70){
    gameRatingText.style.color = "blue";
  }else if(gameData.steamRatingPercent <= 69 && gameData.steamRatingPercent >= 40){
    gameRatingText.style.color = "orange";
  }else if(gameData.steamRatingText === null){
    gameRatingText.innerText = "Not Enough Reviews"
    gameRatingPercent.innerText = ""
  } else{
    gameRatingText.style.color = "red";
  }


 
  gameDetails.classList.toggle('hidden')
  document.getElementById('gameImage').classList.toggle('hidden')
  
}




