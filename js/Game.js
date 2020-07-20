class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();

        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        });
    }

    async start(){
        if(gameState===0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage("car1",car1_img)
        car1.scale = 0.2
        
        car2 = createSprite(300,200);
        car2.addImage("car2",car2_img)
        car2.scale = 0.2

        car3 = createSprite(500,200);
        car3.addImage("car3",car3_img)
        car3.scale = 0.2

        car4 = createSprite(700,200);
        car4.addImage("car1",car4_img)
        car4.scale = 0.2

        cars = [car1,car2,car3,car4];
    }

    play(){
        form.hide();
        
        Player.getPlayerInfo();

        if(allPlayers !== undefined){
            background(rgb(198,135,103));

            image(track,0,170,displayWidth*6,displayHeight*2);


            //var display_position = 130;

            //index of the array
            var index = 0;

           //x and y position of the cars
            var y = 170 ;
			var x = -30;

            for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index+1;

                //position the cars a little away from eachother
                y = y+220;

                //use data from the database to display the cars in the y direction
                x = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index===player.index){
                    cars[index-1].shapeColor = "red";
                    camera.position.x = cars[index-1].x+500;
                    camera.position.y = displayWidth/2;
                }
                

            }
        }

        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance-=50
            player.update();
        }
        if(player.distance>3860){
            gameState = 2;
        }
        drawSprites();
    }

    end(){
        console.log("game ended");
        game.update(2);
    }
}