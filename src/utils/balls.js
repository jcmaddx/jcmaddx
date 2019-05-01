import Matter from 'matter-js';
import wrap from 'matter-wrap';

import skills from '../data/skills';

Matter.use(
    'matter-wrap'
);

Matter.Render.bodies = function(render, bodies, context) {
  var c = context,
      engine = render.engine,
      options = render.options,
      showInternalEdges = options.showInternalEdges || !options.wireframes,
      body,
      part,
      i,
      k;

  for (i = 0; i < bodies.length; i++) {
    body = bodies[i];

    if (!body.render.visible)
      continue;

    // handle compound parts
    for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
      part = body.parts[k];

      if (!part.render.visible)
        continue;

      if (options.showSleeping && body.isSleeping) {
        c.globalAlpha = 0.5 * part.render.opacity;
      } else if (part.render.opacity !== 1) {
        c.globalAlpha = part.render.opacity;
      }

      if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
        // part sprite
        var sprite = part.render.sprite;
            //texture = _getTexture(render, sprite.texture);

        c.translate(part.position.x, part.position.y);
        c.rotate(part.angle);

        // c.drawImage(
        //     texture,
        //     texture.width * -sprite.xOffset * sprite.xScale,
        //     texture.height * -sprite.yOffset * sprite.yScale,
        //     texture.width * sprite.xScale,
        //     texture.height * sprite.yScale
        // );

        // revert translation, hopefully faster than save / restore
        c.rotate(-part.angle);
        c.translate(-part.position.x, -part.position.y);
      } else {
        // part polygon
        if (part.circleRadius) {
          c.beginPath();
          c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
        } else {
          c.beginPath();
          c.moveTo(part.vertices[0].x, part.vertices[0].y);

          for (var j = 1; j < part.vertices.length; j++) {
              if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                c.lineTo(part.vertices[j].x, part.vertices[j].y);
              } else {
                c.moveTo(part.vertices[j].x, part.vertices[j].y);
              }

              if (part.vertices[j].isInternal && !showInternalEdges) {
                c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
              }
          }

          c.lineTo(part.vertices[0].x, part.vertices[0].y);
          c.closePath();
        }

        if (!options.wireframes) {
          c.fillStyle = part.render.fillStyle;
          if(options.showShadows){
	          c.shadowColor = part.render.fillStyle;
	          c.shadowBlur = 15;
	        }

          if (part.render.lineWidth) {
            c.lineWidth = part.render.lineWidth;
            c.strokeStyle = part.render.strokeStyle;
            c.stroke();
          }

          c.fill();
        } else {
          c.lineWidth = 1;
          c.strokeStyle = '#bbb';
          c.stroke();
        }
      }

      c.globalAlpha = 1;
      if(part.render.text) {
				//30px is default font size
				var fontsize = 18;
				//arial is default font family
				var fontfamily = part.render.text.family || "Orbitron"; 
				//white text color by default
				var color = part.render.text.color || "#FFFFFF";

				if(part.render.text.size)
					fontsize = part.render.text.size;
				else if(part.circleRadius)
					fontsize = part.circleRadius/2;

				var content = "";
				if(typeof part.render.text == "string")
					content = part.render.text;
				else if(part.render.text.content)
					content = part.render.text.content;

				c.textBaseline="middle";
				c.textAlign="center";
				c.fillStyle=color;
				c.font = fontsize+'px '+fontfamily;
				c.fillText(content,part.position.x,part.position.y);
			}
    }
  }
};

export function ballpool() {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Scale = 1.5,
        interval;

    // window sizes
    let wWidth = window.innerWidth;
    let wHeight =  window.innerHeight;
    let colors = ["#00ff9f", "#00b8ff", "#d600ff", "#001eff"];

    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
        element: document.getElementById("balls"),
        engine: engine,
        options: {
          width: wWidth,
          height: wHeight,
          showAngleIndicator: false,
          wireframes: false,
          background: 'transparent',
          showShadows: false
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
        Bodies.rectangle(0, wHeight, wWidth * 3, 5, { isStatic: true, render: {fillStyle: '#000'} })
    ]);

    let stackBefore = Composites.stack(0, 0, skills.data.length, 2, 10, 10, function(x, y) {
    		let rando = Common.random(10, 30) * Scale;
    		let randomColor = colors[Math.floor(Math.random() * Math.floor(4))]
        return Bodies.circle(x, y, rando, { restitution: 0.1, friction: 0.1, render: {fillStyle: randomColor} });
    });

    let skillStack = Composites.stack(10, 10, skills.data.length, 1, 10, 10, function(a, b, c){
    	let current = skills.data[c];
    	return Bodies.polygon(a, b, current.sides, current.radius * Scale, {render: { fillStyle: current.color, text: {content: current.text, size: current.fontsize * Scale}}});
    })

    let stackAfter = Composites.stack(20, 20, skills.data.length, 2, 10, 10, function(x, y) {
    		let rando = Common.random(10, 30) * Scale;
    		let randomColor = colors[Math.floor(Math.random() * Math.floor(4))]
        return Bodies.circle(x, y, rando, { restitution: 0.1, friction: 0.1, render: {fillStyle: randomColor} });
    });
    
    World.add(world, [
    		stackBefore,
        skillStack
    ]);

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: wWidth, y: wHeight }
    });

    // wrapping using matter-wrap plugin
    let allBodies = Composite.allBodies(world);

    for (let i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 50, y: render.bounds.min.y },
            max: { x: render.bounds.max.x + 50, y: render.bounds.max.y }
        };
    }

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};