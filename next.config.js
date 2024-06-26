/** @type {import('next').NextConfig} */

module.exports = {
  basePath: '/blog',
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
    images: {
     // reactStrictMode:true,
     // swcMinify:true,
      unoptimized:true,
      domains: ['api.slingacademy.com', 'images.unsplash.com' , 'https://www.lpuonline.com' , 'flowbite.s3.amazonaws.com' ,'img.freepik.com' ,'https://schema.org/']
    },
  
}
