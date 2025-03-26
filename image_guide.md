# Brand Images Guide

This guide explains how to set up your brand images for the SLP Tundra website.

## Image Locations

Place all brand images in the following directory structure:

```
public/images/brands/
```

## Required Brand Images

You need to prepare the following brand image files and place them in the directory above:

| Brand Name | Image Filename |
|------------|---------------|
| Botanas Provi | `botanas-provi.jpg` |
| Panaderías La Superior | `panaderia-la-superior.jpg` |
| Aguas de Lourdes | `aguas-de-lourdes.jpg` |
| Chocolates Costanzo | `chocolates-costanzo.jpg` |
| Quesos Carranco | `quesos-carranco.jpg` |
| Cajeta Coronado | `cajeta-coronado.jpg` |
| Bicicletas Mercurio | `bicicletas-mercurio.jpg` |
| Canel's | `canels.jpg` |
| Ron Potosí | `ron-potosino.jpg` |
| Las Sevillanas | `las-sevillanas.jpg` |
| Productos Don Tacho | `productos-don-tacho.jpg` |

## Image Recommendations

- **Image Size**: Recommended size is 800x600 pixels (4:3 ratio)
- **File Format**: JPG or JPEG format works best
- **File Size**: Keep images under 500KB for better performance

## Steps to Set Up Images

1. Create the directory structure if it doesn't exist:
   ```
   mkdir -p public/images/brands
   ```

2. Place your brand images in this directory with the exact filenames listed above

3. Run the update script to link the images to the brands in the database:
   ```
   python update_brand_image_paths.py
   ```

4. Restart your development server:
   ```
   npm run dev
   ```

5. Verify that the images appear correctly on the brands page at `/brands`

## Default Image

If you don't have an image for a specific brand, the system will use:
```
/images/placeholder.jpg
```

You can also create this placeholder image and place it in the `public/images/` directory. 