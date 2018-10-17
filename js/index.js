$(function(){
    $.get('./songs.json').then(function(response){
    //   console.log(response)用GitHub的服务器打出来的有可能是字符串
      let items=response
      items.forEach((i)=>{
          let $li=$(`<li>
          <a href="./song.html?id=${i.id}">                
              <h3>${i.name}</h3>
              <p>
                  <svg class="icon-sq">
                      <use xlink:href="#icon-sq"></use>
                  </svg>
                  ${i.singer}-${i.album}</p>
              
              <svg class="icon">
                  <use xlink:href="#icon-play-circle"></use>
              </svg>
          </a>
      </li>
          `)
          let $li2=(`<li>
          <a href="./song.html?id=${i.id}">                
              <h3>${i.name}</h3>
              <p>
                  <svg class="icon-sq">
                      <use xlink:href="#icon-sq"></use>
                  </svg>
                  ${i.singer}-${i.album}</p>
              
              <svg class="icon">
                  <use xlink:href="#icon-play-circle"></use>
              </svg>
          </a>
      </li>
          `)
          $('#latesterMusic').append($li)
          $('#tab2Html').append($li2)
      })
      $('#latesterMusicLoading').remove()
    },function(){
        throw Error
    })
    $('.siteNav').on('click','ol.tabItems>li',function(e){
        // console.log(e)       
       let $li =$(e.currentTarget).addClass('active')
       $li.siblings().removeClass('active')
       let index =$li.index()
    //    console.log($li,index)
       $('.tabContent>li').eq(index).addClass('active')
       .siblings().removeClass('active')
       $li.trigger('tabChange',index)
    })
    $('.siteNav').on('tabChange',function(e,index){
        let $li=$('.tabContent>li').eq(index)
        if($li.attr('data-downloaded')==='yes')return

       if(index ===1){
           return
           $.get('./page2.json').then((response)=>{
               console.log(response)
               $li.html(response.html)
               $li.attr('data-downloaded','yes')
            })
       }else if(index===2){
           return
           $.get('./page3.json').then((response)=>{
               
               console.log(response)
               $li.text(response.content)
               $li.attr('data-downloaded','yes')

           })
       }
    })
    let timer=undefined
    $('input#searchSong').on('input',(e)=>{
        let $input=$(e.currentTarget)
        let value=$input.val().trim()
        if(value===''){return}
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(function(){
            search(value).then((result)=>{
                timer =undefined
                $('#output').empty()
                if(result.length!==0){
                    console.log(result)
                    let $li=`<a href="./song.html?id=${result[0].id}"><li>${result[0].name} - ${result[0].singer}</li><a>`
                    $('#output').append($li)
                // $('#output').text(result.map((r)=>r.name).join(','))
                }else{
                    $('#output').text('没有结果')
                }
            })
        })
        
    })
    function search(keyword){
        return new Promise((resolve,reject)=>{
            var database=[ 
                {   "id":"1","name":"Maps","singer":"Maroon5"},
                {   "id":"2","name":"Shape Of You","singer":"Ed Sheeran"},
                {   "id":"3","name":"Beautiful In White","singer":"Shane Filan"},
                {   "id":"4","name":"suger","singer":"Maroon5"},
                {   "id":"5","name":"Uptown Funk","singer":"Bruno Mars"},
                {   "id":"6","name":"模特","singer":"李荣浩"},
                {   "id":"7","name":" Fairy Tail(妖精的尾巴)","singer":"高梨康治"},
                {   "id":"8","name":"喜欢你","singer":"邓紫棋"},
                {   "id":"9","name":"难念的经","singer":"周华健"},
                {   "id":"10","name":"I'll be there for you","singer":"The Rembrandts"}
            ]
            let result= database.filter(function(item){
                 return  item.name.indexOf(keyword)>=0||item.singer.indexOf(keyword)>=0
            })
            setTimeout(() => {
                resolve(result)
            }, ~~Math.random()*1000+300)
        })
       
    }
    window.search=search
})