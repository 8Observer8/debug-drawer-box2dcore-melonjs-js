import * as me from 'melonjs';
import DebugDrawer from './debug-drawer.js';
import { b2BodyType } from '@box2d/core';
import { b2CircleShape } from '@box2d/core';
import { b2PolygonShape } from '@box2d/core';
import { b2Vec2 } from '@box2d/core';
import { b2World } from '@box2d/core';
import { DrawShapes } from '@box2d/core';

me.device.onReady(
    () => {
        if (!me.video.init(300, 300, {
                parent: 'screen',
                renderer: me.video.WEBGL,
                scale: 'fit',
                antiAlias: true
            })) //
        {
            alert('Your browser does not support HTML5 canvas.');
            return;
        }

        class Graphics extends me.Renderable {
            constructor() {
                super(0, 0, me.game.viewport.width, me.game.viewport.height);
                this.anchorPoint.set(0, 0);

                this.world = b2World.Create({ x: 0, y: 9.8 });
                this.pixelsPerMeter = 30;
                this.debugDrawer = new DebugDrawer(me.game.renderer, this.pixelsPerMeter);

                // Ground
                const groundShape = new b2PolygonShape();
                groundShape.SetAsBox(130 / this.pixelsPerMeter, 20 / this.pixelsPerMeter);
                const groundBody = this.world.CreateBody({
                    type: b2BodyType.b2_staticBody,
                    position: { x: 150 / this.pixelsPerMeter, y: 270 / this.pixelsPerMeter }
                });
                groundBody.CreateFixture({ shape: groundShape });

                // Box
                const boxShape = new b2PolygonShape();
                boxShape.SetAsBox(30 / this.pixelsPerMeter, 30 / this.pixelsPerMeter);
                const boxBody = this.world.CreateBody({
                    type: b2BodyType.b2_dynamicBody,
                    position: { x: 100 / this.pixelsPerMeter, y: 30 / this.pixelsPerMeter },
                    angle: 30 * Math.PI / 180
                });
                boxBody.CreateFixture({ shape: boxShape, density: 1 });

                // Circle
                const circleShape = new b2CircleShape(20 / this.pixelsPerMeter);
                const circleBody = this.world.CreateBody({
                    type: b2BodyType.b2_dynamicBody,
                    position: { x: 200 / this.pixelsPerMeter, y: 50 / this.pixelsPerMeter }
                });
                const circleFixture = circleBody.CreateFixture({ shape: circleShape, density: 1 });
                circleFixture.SetRestitution(0.5);

                // Platform
                const platformShape = new b2PolygonShape();
                platformShape.SetAsBox(50 / this.pixelsPerMeter, 5 / this.pixelsPerMeter);
                const platformBody = this.world.CreateBody({
                    type: b2BodyType.b2_staticBody,
                    position: { x: 220 / this.pixelsPerMeter, y: 200 / this.pixelsPerMeter },
                    angle: -20 * Math.PI / 180
                });
                platformBody.CreateFixture({ shape: platformShape });
            }

            update(dt) {
                this.world.Step(dt / 1000, { velocityIterations: 3, positionIterations: 2 });
                return true;
            }

            draw(renderer) {
                renderer.clearColor('#000000');
                renderer.setGlobalAlpha(1);
                DrawShapes(this.debugDrawer, this.world);
            }
        }

        me.game.world.addChild(new Graphics());
    });
