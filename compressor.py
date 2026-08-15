import sys
import os
from PIL import Image
from pydub import AudioSegment

def compress_image(input_path, output_path, quality=60):
    """Compress image using Pillow"""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary for JPEG
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = background
            
            # Determine output format
            ext = os.path.splitext(output_path)[1].lower()
            if ext in ['.jpg', '.jpeg']:
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            elif ext == '.png':
                img.save(output_path, 'PNG', optimize=True)
            elif ext == '.webp':
                img.save(output_path, 'WEBP', quality=quality)
            elif ext == '.bmp':
                img.save(output_path, 'BMP')
            elif ext in ['.tiff', '.tif']:
                img.save(output_path, 'TIFF', compression='jpeg', quality=quality)
            else:
                # Default to JPEG
                output_path = os.path.splitext(output_path)[0] + '.jpg'
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        return True
    except Exception as e:
        print(f"Image compression error: {e}", file=sys.stderr)
        return False

def check_ffmpeg():
    """Check if ffmpeg is available"""
    import subprocess
    import os
    
    # Check in system PATH
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return 'ffmpeg'
    except:
        pass
    
    # Check in script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    local_ffmpeg = os.path.join(script_dir, 'ffmpeg.exe')
    if os.path.exists(local_ffmpeg):
        return local_ffmpeg
    
    return None

def compress_audio(input_path, output_path, bitrate='64k'):
    """Compress audio using pydub"""
    import shutil
    
    try:
        # Check if ffmpeg is available
        ffmpeg_path = check_ffmpeg()
        if not ffmpeg_path:
            print("WARNING: ffmpeg not found. Copying audio without compression.", file=sys.stderr)
            shutil.copy2(input_path, output_path)
            return True
        
        # Set ffmpeg path for pydub
        if ffmpeg_path != 'ffmpeg':
            AudioSegment.converter = ffmpeg_path
            AudioSegment.ffmpeg = ffmpeg_path
        
        # Load audio file
        audio = AudioSegment.from_file(input_path)
        
        # Determine format from extension
        ext = os.path.splitext(output_path)[1].lower()
        format_map = {
            '.mp3': 'mp3',
            '.wav': 'wav',
            '.ogg': 'ogg',
            '.flac': 'flac',
            '.m4a': 'mp4',
            '.aac': 'adts'
        }
        
        output_format = format_map.get(ext, 'mp3')
        
        # Export with reduced bitrate
        if output_format == 'mp3':
            audio.export(output_path, format=output_format, bitrate=bitrate)
        elif output_format in ['ogg', 'mp4']:
            audio.export(output_path, format=output_format, codec='aac', bitrate=bitrate)
        else:
            audio.export(output_path, format=output_format)
        
        return True
    except Exception as e:
        print(f"Audio compression error: {e}", file=sys.stderr)
        # Fallback: just copy the file
        try:
            import shutil
            shutil.copy2(input_path, output_path)
            print("Fallback: copied audio without compression", file=sys.stderr)
            return True
        except:
            return False

def main():
    if len(sys.argv) != 4:
        print("Usage: python compressor.py <input_path> <output_path> <file_type>", file=sys.stderr)
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    file_type = sys.argv[3]
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    success = False
    
    if file_type == 'image':
        success = compress_image(input_path, output_path)
    elif file_type == 'audio':
        success = compress_audio(input_path, output_path)
    else:
        print(f"Unsupported file type: {file_type}", file=sys.stderr)
        sys.exit(1)
    
    if not success:
        sys.exit(1)
    
    print("Compression successful")
    sys.exit(0)

if __name__ == '__main__':
    main()
