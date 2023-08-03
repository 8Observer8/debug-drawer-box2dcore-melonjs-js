import * as me from "melonjs";

export default class DebugDrawer {
    constructor(renderer, pixelsPerMeter) {
        this.renderer = renderer;
        this.pixelsPerMeter = pixelsPerMeter;

        this.translationX = 0;
        this.translationY = 0;
        this.angle = 0;
    }

    DrawSolidPolygon(vertices, vertexCount, color) {
        this.renderer.setLineWidth(3);
        this.renderer.beginPath();
        const c = new me.Color().setFloat(color.r, color.g, color.b, 1);
        this.renderer.setColor(c);
        this.renderer.moveTo((vertices[0].x + this.translationX) * this.pixelsPerMeter,
            (vertices[0].y + this.translationY) * this.pixelsPerMeter);
        this.renderer.lineTo((vertices[1].x + this.translationX) * this.pixelsPerMeter,
            (vertices[1].y + this.translationY) * this.pixelsPerMeter);
        this.renderer.lineTo((vertices[2].x + this.translationX) * this.pixelsPerMeter,
            (vertices[2].y + this.translationY) * this.pixelsPerMeter);
        this.renderer.lineTo((vertices[3].x + this.translationX) * this.pixelsPerMeter,
            (vertices[3].y + this.translationY) * this.pixelsPerMeter);
        this.renderer.lineTo((vertices[0].x + this.translationX) * this.pixelsPerMeter,
            (vertices[0].y + this.translationY) * this.pixelsPerMeter);
        this.renderer.stroke();
    }

    PushTransform(xf) {
        this.renderer.save();
        this.renderer.translate(xf.p.x * this.pixelsPerMeter, xf.p.y * this.pixelsPerMeter);
        this.renderer.rotate(xf.q.GetAngle());
    }

    PopTransform(xf) {
        this.renderer.restore();
    }

    DrawPolygon(vertices, vertexCount, color) {}
    DrawCircle(center, radius, color) {}

    DrawSolidCircle(center, radius, axis, color) {
        let angle = 0;
        const angleStep = 20;
        const n = 360 / angleStep;
        radius = radius * this.pixelsPerMeter;

        this.renderer.setLineWidth(3);
        this.renderer.beginPath();
        const c = new me.Color().setFloat(color.r, color.g, color.b, 1);
        this.renderer.setColor(c);

        let x = radius * Math.cos(angle * Math.PI / 180);
        let y = radius * Math.sin(angle * Math.PI / 180);
        this.renderer.moveTo(x, y);
        angle += angleStep;

        for (let i = 0; i < n; i++) {
            x = radius * Math.cos(angle * Math.PI / 180);
            y = radius * Math.sin(angle * Math.PI / 180);
            this.renderer.lineTo(x, y);
            angle += angleStep;
        }
        this.renderer.stroke();
    }

    DrawSegment(p1, p2, color) {}
    DrawTransform(xf) {}
    DrawPoint(p, size, color) {}
}
