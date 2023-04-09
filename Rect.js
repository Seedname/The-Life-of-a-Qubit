class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    collide(c, r) {
        // Find the closest point to the circle within the rectangle
        const closestX = Math.max(this.x, Math.min(c.x, this.x + this.w));
        const closestY = Math.max(this.y, Math.min(c.y, this.y + this.h));
        
        // Calculate the distance between the circle's center and this closest point
        const distanceX = c.x - closestX;
        const distanceY = c.y - closestY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // If the distance is less than the circle's radius, an intersection has occurred
        if (distance < r) {
          // Calculate the direction vector from the circle to the closest point
          const directionX = closestX - c.x;
          const directionY = closestY - c.y;
          
          // Check if the circle is intersecting with the x side, y side, or corner of the rectangle
          const absDirectionX = Math.abs(directionX);
          const absDirectionY = Math.abs(directionY);
          const intersectX = absDirectionX < r && absDirectionX <= absDirectionY;
          const intersectY = absDirectionY < r && absDirectionY <= absDirectionX;
          
          // Move the circle outside of the rectangle to the side that it intersects with
          if (intersectX) {
            c.x -= directionX > 0 ? absDirectionX : -absDirectionX;
          } else if (intersectY) {
            c.y -= directionY > 0 ? absDirectionY : -absDirectionY;
          }
          
        //   return true;
        }
        
        // return false;
      }

}