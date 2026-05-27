# EduVance Academy — Docker Configuration
# Uses lightweight nginx to serve static HTML files

FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy all EduVance HTML files and assets
COPY *.html ./
COPY *.svg ./
COPY *.js ./

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
