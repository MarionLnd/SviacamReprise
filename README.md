Ce projet est une reprise du projet Sviacam, dont le code source original se situe sur [Github](https://github.com/LiseNakache/sviacam).

# Sviacam

## Un site internet qui déclenche des événements souris et clavier, à partir de reconnaissance de mouvements depuis la webcam :computer: :camera:
#### Piloter des logiciels en repérant, grâce à la Webcam , des gestes effectués dans des zones prédéfinies.


### Pour coder ce projet, nous avons utilisé :  
- **Javascript**
- **Jquery**
- **NodeJs**

### Documentation d'installation : 
1) Ouvrez votre terminal et clonez ce repository.
2) Éxécutez la commande **npm install** dans votre terminal, afin d'installer les modules.
3) Éxécutez la commande **nodemon app.js** afin de lancer l'application.
4) Sur Google, allez sur la route **localhost:3000**.


### Documentation d'utilisation :
#### Interface du projet :
![Screenshot 2020-11-09 20 28 58](https://user-images.githubusercontent.com/31901812/98645777-b6f86080-2332-11eb-8ac3-04801bfa5a0d.png)

1) Vous pouvez cliquer sur au moins un des boutons présents dans la partie "Zones de détection (bleue)" afin d'activer et afficher les zones dans lesquelles vos mouvements seront analysés.
2) Choisissez une action par zone activée qui se déclenchera lors de votre mouvement.
![Screenshot Boutons actives](https://user-images.githubusercontent.com/31901812/98662673-6f7ccf00-2348-11eb-848b-b5e6495f20d3.jpeg)
3) Appuyez sur la case "Activer la détection" afin de sauvegarder les informations des mouvements. Ces derniers sont à présent détectés et vous pouvez constater les différentes actions et évènements déclenchés au passage dans les zones concernées et un son sera émis.
4) Vous avez également la possibilité d'activer la détection des mouvements de la main et des doigts afin de déclencher d'autres actions telles que :

       👉 : la souris se dirige vers la droite
       👈 : la souris se dirige vers la gauche
       ✌ : (évènement à personnaliser)
       👆 : la souris se dirige vers le haut
       👇 : la souris se dirige vers le bas
       ✊ : (évènement à personnaliser)

![Screenshot Mvt doigt 1](https://user-images.githubusercontent.com/31901812/98663693-b3240880-2349-11eb-83f5-e6c76e7b38d9.jpeg)
![Screenshot Mvt doigt 2](https://user-images.githubusercontent.com/31901812/98663699-b5866280-2349-11eb-965a-4436f92b1968.jpeg)
![Screenshot Mvt doigt 3](https://user-images.githubusercontent.com/31901812/98663702-b61ef900-2349-11eb-898a-a309fcd23b65.jpeg)
![Screenshot Mvt doigt 4](https://user-images.githubusercontent.com/31901812/98663703-b6b78f80-2349-11eb-9c0c-b7af6766a465.jpeg)


#### Mini-démonstration du mouvement des doigts sur la navigation
![Screenvideo Mvt doigts](https://user-images.githubusercontent.com/31901812/98664800-1e220f00-234b-11eb-9795-eaf45e632e83.gif)

## Librairies ou outils utilisés :
1) [KonvaJs](https://konvajs.org/) pour que l'utilisateur puisse déterminer et modifier le rectangle ou sera anaylisé ses mouvements.
2) Le projet [Motion detection in Javascript](https://github.com/beije/motion-detection-in-javascript) réalisé par [Benjamin Horn](https://github.com/beije) pour détécter les mouvements de l'utilisateur. 
3) [Socket.IO](https://socket.io/get-started/chat) pour emettre des évènements à partir des mouvements de l'utilisateur.
4) [RobotJS](http://robotjs.io/docs/) pour lancer les évènements de souris ou de clavier.
5) [TensorFlow](https://www.tensorflow.org/) afin de détecter les mouvements précis des doigts
6) [FingerPose](https://github.com/andypotato/fingerpose) qui utilise la technologie Google d'apprentissage automatique [TensorFlow](https://www.tensorflow.org/)
