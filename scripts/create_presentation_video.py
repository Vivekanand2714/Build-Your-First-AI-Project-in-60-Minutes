import os
import sys
import wave
import subprocess
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import win32com.client
import imageio_ffmpeg

# Paths
WORKSPACE = r"C:\Users\vivek\OneDrive\Desktop\Build Your First AI Project in 60 Minutes"
TEMP_DIR = os.path.join(os.environ["TEMP"], "presentation_video_build")
os.makedirs(TEMP_DIR, exist_ok=True)
SCREENSHOTS_DIR = os.path.join(os.environ["TEMP"], "video_screenshots")

OUTPUT_MP4 = os.path.join(WORKSPACE, "Build_Your_First_AI_Project_in_60_Minutes_Presentation.mp4")
DESKTOP_COPY = os.path.join(r"C:\Users\vivek\OneDrive\Desktop", "Presentation_Video_3Min.mp4")

# Resolution & Frame Rate
WIDTH = 1920
HEIGHT = 1080
FPS = 24

# Colors
C_DARK_BG = (15, 23, 42)
C_EMERALD = (5, 150, 105)
C_WHITE = (255, 255, 255)
C_SLATE_400 = (148, 163, 184)
C_SLATE_500 = (100, 116, 139)
C_SLATE_700 = (51, 65, 85)
C_SLATE_900 = (15, 23, 42)
C_ACCENT_GREEN = (16, 185, 129)

# Fonts
WIN_FONTS = os.path.join(os.environ["WINDIR"], "Fonts")
def get_font(name="segoeui.ttf", size=24):
    path = os.path.join(WIN_FONTS, name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

font_title = get_font("segoeuib.ttf", 46)
font_h2 = get_font("segoeuib.ttf", 34)
font_h3 = get_font("segoeuib.ttf", 26)
font_body = get_font("segoeui.ttf", 22)
font_sub = get_font("segoeui.ttf", 19)
font_badge = get_font("segoeuib.ttf", 18)
font_subtitle_cc = get_font("segoeuib.ttf", 23)

CHAPTERS_DATA = [
    {
        "id": 1,
        "title": "The Challenge & Proposition",
        "voiceover": "Hi, I'm Vivek, and this is my solution for the growth challenge. The objective was to drive 500 final-year engineering student registrations in 7 days with a simulated budget of 2,000 rupees. My approach was to build a growth system around a simple proposition: Build Your First AI Project in 60 Minutes.",
        "type": "slide_challenge",
        "key_highlight": "Target: 500 Registrations | 7 Days | ₹2,000 Budget"
    },
    {
        "id": 2,
        "title": "The Growth Strategy",
        "voiceover": "Instead of treating this as just a workshop registration campaign, I designed the product itself to support acquisition and referrals. My core growth loop is simple: a student discovers the workshop, registers, gets a referral link, shares it with classmates, and those registrations contribute to their campus leaderboard. On a 2,000 rupee budget, peer referrals in college WhatsApp groups are our primary acquisition engine.",
        "type": "slide_growth_loop",
        "key_highlight": "Loop: Discover → Register → Refer → WhatsApp Share → Campus Pride"
    },
    {
        "id": 3,
        "title": "High-Converting Landing Page",
        "voiceover": "Starting with the landing page, I wanted the value proposition to be immediately clear. Students are not being asked to join just another webinar. They are being offered a practical outcome: building an AI project in 60 minutes. The messaging focuses on real hands-on learning with zero local setup required.",
        "type": "screen_scroll",
        "screen": "landing_tall.png",
        "key_highlight": "Outcome: Build real AI project in 60 mins with 0 setup"
    },
    {
        "id": 4,
        "title": "AI Project Playground",
        "voiceover": "The AI Project Playground makes that promise more tangible. Students can explore the exact projects they could build, understand the problem, see the AI component, and follow a structured 5-step build journey. Testing a simulated output directly in the browser eliminates skepticism before they even sign up.",
        "type": "screen_scroll",
        "screen": "playground_tall.png",
        "key_highlight": "Blueprints: Resume Analyzer, Chatbot, Predictor & Sentiment AI"
    },
    {
        "id": 5,
        "title": "Registration & Instant Referral Loop",
        "voiceover": "When a student registers, they immediately receive a unique referral code and a pre-configured referral link. We eliminate friction by immediately activating their session without password barriers. Every registrant instantly becomes an organic distribution node for their college.",
        "type": "screen_static",
        "screen": "register.png",
        "key_highlight": "Unique Code: AI60-VIVEK7 + Pre-filled WhatsApp Share"
    },
    {
        "id": 6,
        "title": "Student Dashboard & AI Builder Journey",
        "voiceover": "Inside the student dashboard, we give builders continuous momentum. The AI Builder Journey tracks their progress across five milestones. Crucially, the Rally Your College section connects their individual referrals directly to their campus standing. When a classmate signs up through their link, their referral count and campus rank update in real time.",
        "type": "screen_scroll",
        "screen": "dashboard_tall.png",
        "key_highlight": "Momentum: 5 Milestones + Live Referral Counter"
    },
    {
        "id": 7,
        "title": "Campus Challenge & WhatsApp Sharing",
        "voiceover": "To accelerate viral sharing, I built the Campus Challenge. College pride is a powerful growth trigger for engineering students. Campuses compete on a live simulated leaderboard. Students see exactly how many registrations are needed to overtake the next college and can rally their branch WhatsApp groups with a single click.",
        "type": "screen_scroll",
        "screen": "campus_tall.png",
        "key_highlight": "Rivalry: 6 Recognized Institutions on Live Leaderboard"
    },
    {
        "id": 8,
        "title": "Growth Admin Analytics & Conclusion",
        "voiceover": "We also designed an end-to-end WhatsApp retention flow and a live workshop countdown. Finally, in the Growth Admin dashboard, the entire simulation is measurable: we track our 500-student goal, referral share, campus breakdown, and the full conversion funnel. In 7 days with 2,000 rupees, organic peer referral and campus competition are what make 500 registrations achievable. Thank you!",
        "type": "screen_scroll",
        "screen": "admin_tall.png",
        "key_highlight": "Analytics: 5 KPIs, Funnel Tracking & Campaign Attribution"
    }
]

print("=== STEP 1: GENERATING SPEECH AUDIO TRACKS ===")
speaker = win32com.client.Dispatch("SAPI.SpVoice")
speaker.Rate = 0

chapter_timings = []
audio_files = []

for ch in CHAPTERS_DATA:
    ch_id = ch["id"]
    wav_path = os.path.join(TEMP_DIR, f"speech_ch_{ch_id}.wav")
    stream = win32com.client.Dispatch("SAPI.SpFileStream")
    stream.Open(wav_path, 3)
    speaker.AudioOutputStream = stream
    speaker.Speak(ch["voiceover"])
    stream.Close()

    with wave.open(wav_path, "rb") as w:
        frames = w.getnframes()
        rate = w.getframerate()
        duration = frames / float(rate)

    print(f"Ch {ch_id} ({ch['title']}): speech = {duration:.2f}s")
    audio_files.append((wav_path, duration))

print("\n=== STEP 2: ASSEMBLING MASTER AUDIO ===")
master_wav = os.path.join(TEMP_DIR, "master_audio.wav")

with wave.open(audio_files[0][0], "rb") as first_w:
    sample_rate = first_w.getframerate()
    sample_width = first_w.getsampwidth()
    channels = first_w.getnchannels()

master_writer = wave.open(master_wav, "wb")
master_writer.setnchannels(channels)
master_writer.setsampwidth(sample_width)
master_writer.setframerate(sample_rate)

current_time_sec = 0.0

for idx, (wav_path, speech_dur) in enumerate(audio_files):
    ch = CHAPTERS_DATA[idx]
    pause_dur = 0.8 if idx < len(audio_files) - 1 else 1.2
    total_ch_dur = speech_dur + pause_dur

    start_sec = current_time_sec
    end_sec = current_time_sec + total_ch_dur

    chapter_timings.append({
        "id": ch["id"],
        "title": ch["title"],
        "voiceover": ch["voiceover"],
        "key_highlight": ch["key_highlight"],
        "type": ch["type"],
        "screen": ch.get("screen", ""),
        "start_sec": start_sec,
        "end_sec": end_sec,
        "duration": total_ch_dur,
        "speech_dur": speech_dur
    })

    with wave.open(wav_path, "rb") as w:
        frames = w.readframes(w.getnframes())
        master_writer.writeframes(frames)

    silence_frames = int(sample_rate * pause_dur)
    silence_bytes = b"\x00" * (silence_frames * channels * sample_width)
    master_writer.writeframes(silence_bytes)

    current_time_sec = end_sec

master_writer.close()
total_video_duration = current_time_sec
total_frames = int(total_video_duration * FPS)

print(f"Master audio generated: {total_video_duration:.2f} seconds ({total_frames} frames at {FPS} FPS)")

def wrap_text(text, font, max_width):
    words = text.split(" ")
    lines = []
    current_line = []
    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = font.getbbox(test_line)
        w = bbox[2] - bbox[0]
        if w <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def fmt_time(seconds):
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m:02d}:{s:02d}"

print("\n=== STEP 3: PRE-CACHING BASE SLIDES & SCREENS ===")

def draw_hud_and_cc(img, ch_info, cur_time_sec, total_dur_sec):
    draw = ImageDraw.Draw(img)

    # Top HUD Bar
    top_bar_h = 56
    draw.rectangle([(0, 0), (WIDTH, top_bar_h)], fill=(15, 23, 42))
    draw.line([(0, top_bar_h), (WIDTH, top_bar_h)], fill=(51, 65, 85), width=1)

    draw.text((32, 14), "Build Your First AI Project in 60 Minutes", font=font_h3, fill=C_WHITE)
    draw.rounded_rectangle([(650, 15), (780, 41)], radius=6, fill=(5, 150, 105), outline=(16, 185, 129))
    draw.text((662, 17), "Live Prototype", font=font_badge, fill=C_WHITE)

    ch_text = f"Ch {ch_info['id']}/8: {ch_info['title']}"
    ch_bbox = font_h3.getbbox(ch_text)
    ch_w = ch_bbox[2] - ch_bbox[0]
    draw.text((WIDTH - 32 - ch_w, 14), ch_text, font=font_h3, fill=C_ACCENT_GREEN)

    # Bottom Subtitles Bar
    cc_bar_h = 100
    cc_y1 = HEIGHT - cc_bar_h
    draw.rectangle([(0, cc_y1), (WIDTH, HEIGHT)], fill=(15, 23, 42))
    draw.line([(0, cc_y1), (WIDTH, cc_y1)], fill=(51, 65, 85), width=1)

    draw.rounded_rectangle([(32, cc_y1 + 18), (80, cc_y1 + 54)], radius=8, fill=(30, 41, 59), outline=(5, 150, 105))
    draw.text((45, cc_y1 + 22), "CC", font=font_badge, fill=C_ACCENT_GREEN)

    cc_lines = wrap_text(f'"{ch_info["voiceover"]}"', font_subtitle_cc, WIDTH - 420)
    if len(cc_lines) > 2:
        cc_lines = cc_lines[:2]
    for i, line in enumerate(cc_lines):
        draw.text((100, cc_y1 + 14 + (i * 30)), line, font=font_subtitle_cc, fill=C_WHITE)

    timer_str = f"{fmt_time(cur_time_sec)} / {fmt_time(total_dur_sec)}"
    draw.text((WIDTH - 240, cc_y1 + 20), timer_str, font=font_h3, fill=C_ACCENT_GREEN)
    draw.text((WIDTH - 240, cc_y1 + 54), "Presenter: Vivek", font=font_sub, fill=C_SLATE_500)

    # Bottom Progress Line
    prog_pct = min(1.0, max(0.0, cur_time_sec / total_dur_sec))
    prog_w = int(WIDTH * prog_pct)
    draw.rectangle([(0, HEIGHT - 6), (WIDTH, HEIGHT)], fill=(30, 41, 59))
    draw.rectangle([(0, HEIGHT - 6), (prog_w, HEIGHT)], fill=(5, 150, 105))

    return img

def create_slide_challenge():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([(140, 120), (WIDTH - 140, HEIGHT - 160)], radius=28, fill=C_WHITE, outline=(226, 232, 240), width=2)
    draw.rounded_rectangle([(180, 160), (490, 198)], radius=19, fill=(236, 253, 245), outline=(167, 243, 208))
    draw.text((196, 168), "GROWTH INTERN HIRING CHALLENGE", font=font_badge, fill=(4, 120, 87))

    draw.text((180, 230), "Build Your First AI Project", font=font_title, fill=(15, 23, 42))
    draw.text((180, 290), "in 60 Minutes", font=font_title, fill=(5, 150, 105))
    draw.text(
        (180, 370),
        "A Product-Led Acquisition & Campus Viral Referral Engine for Engineering Students",
        font=font_h3,
        fill=(71, 85, 105)
    )

    cards = [
        ("500", "REGISTRATIONS", "Challenge Goal (Final-Year Engineers)", (236, 253, 245), (5, 150, 105)),
        ("7 DAYS", "TIME WINDOW", "Rapid Multi-College Execution", (239, 246, 255), (37, 99, 235)),
        ("₹2,000", "SIMULATED BUDGET", "Requires Organic Peer K-Factor > 1.4", (254, 243, 199), (217, 119, 6))
    ]

    card_w = 460
    card_h = 190
    card_gap = 40
    start_x = 180
    start_y = 460

    for i, (val, label, sublabel, bg_col, text_col) in enumerate(cards):
        cx = start_x + i * (card_w + card_gap)
        draw.rounded_rectangle([(cx, start_y), (cx + card_w, start_y + card_h)], radius=20, fill=bg_col, outline=(226, 232, 240), width=2)
        draw.text((cx + 36, start_y + 28), val, font=font_title, fill=text_col)
        draw.text((cx + 36, start_y + 95), label, font=font_badge, fill=(15, 23, 42))
        draw.text((cx + 36, start_y + 130), sublabel, font=font_sub, fill=(100, 116, 139))

    draw.line([(180, 710), (WIDTH - 180, 710)], fill=(226, 232, 240), width=1)
    draw.text((180, 740), "Presenter: Vivek Anand • Growth Intern Candidate", font=font_h3, fill=(15, 23, 42))
    draw.text((180, 780), "Live Prototype Stack: React 19 • Vite • Tailwind • TypeScript • Canvas Confetti", font=font_sub, fill=(100, 116, 139))
    return img

def create_slide_growth_loop(active_step_idx=0):
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([(140, 110), (WIDTH - 140, HEIGHT - 150)], radius=28, fill=C_WHITE, outline=(226, 232, 240), width=2)
    draw.rounded_rectangle([(180, 145), (420, 180)], radius=17, fill=(236, 253, 245), outline=(167, 243, 208))
    draw.text((196, 151), "GROWTH ARCHITECTURE", font=font_badge, fill=(4, 120, 87))

    draw.text((180, 205), "Product-Led Campus Viral Loop", font=font_title, fill=(15, 23, 42))
    draw.text(
        (180, 265),
        "On a ₹2,000 budget, peer referrals in WhatsApp groups are the primary acquisition engine.",
        font=font_h3,
        fill=(71, 85, 105)
    )

    steps = [
        ("01", "Discover", "Discovers via WhatsApp branch group / peer invite"),
        ("02", "Register", "Zero-friction 30s form with instant session launch"),
        ("03", "Get Referral Code", "Instant personalized code generated (AI60-VIVEK7)"),
        ("04", "Share with Peers", "1-tap WhatsApp broadcast to campus study groups"),
        ("05", "Campus Challenge", "College climbs live inter-institution leaderboard"),
        ("06", "More Registrations", "K-Factor multiplier drives 500 target at ₹4/reg")
    ]

    grid_w = 460
    grid_h = 160
    col_gap = 40
    row_gap = 26
    gx = 180
    gy = 330

    for idx, (num, step_name, step_desc) in enumerate(steps):
        row = idx // 3
        col = idx % 3
        x = gx + col * (grid_w + col_gap)
        y = gy + row * (grid_h + row_gap)

        is_active = (idx == active_step_idx)
        card_bg = (236, 253, 245) if is_active else (248, 250, 252)
        border_col = (5, 150, 105) if is_active else (226, 232, 240)
        border_w = 3 if is_active else 1

        draw.rounded_rectangle([(x, y), (x + grid_w, y + grid_h)], radius=18, fill=card_bg, outline=border_col, width=border_w)
        draw.text((x + 24, y + 20), num, font=font_badge, fill=(5, 150, 105) if is_active else (148, 163, 184))
        draw.text((x + 64, y + 18), step_name, font=font_h3, fill=(15, 23, 42))

        desc_lines = wrap_text(step_desc, font_sub, grid_w - 48)
        for d_i, d_line in enumerate(desc_lines):
            draw.text((x + 24, y + 64 + (d_i * 24)), d_line, font=font_sub, fill=(71, 85, 105))

    draw.rounded_rectangle([(180, 725), (WIDTH - 180, 800)], radius=16, fill=(15, 23, 42))
    draw.text((220, 745), "Loop Thesis: 100 Initial Seed Students  x  1.4 Referral K-Factor  =  500+ Registrations in 7 Days", font=font_h3, fill=(16, 185, 129))
    return img

# Load screenshot images
preloaded_screens = {}
for fname in ["landing_tall.png", "playground_tall.png", "register.png", "dashboard_tall.png", "campus_tall.png", "admin_tall.png"]:
    fpath = os.path.join(SCREENSHOTS_DIR, fname)
    if os.path.exists(fpath):
        preloaded_screens[fname] = Image.open(fpath).convert("RGB")
    else:
        print(f"Warning: Screenshot missing: {fname}")

# Pre-render Chapter 1 slide
slide_ch1 = create_slide_challenge()

# Pre-render 6 states of Chapter 2
loop_slides = [create_slide_growth_loop(i) for i in range(6)]

print("\n=== STEP 4: RENDERING HIGH-SPEED VIDEO VIA FFMPEG PIPE ===")
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

cmd = [
    ffmpeg_exe,
    "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "bgr24",
    "-r", str(FPS),
    "-i", "-",
    "-i", master_wav,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "veryfast",
    "-crf", "20",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    OUTPUT_MP4
]

proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

# Render second-by-second (1 keyframe per second, written FPS times)
total_seconds = int(total_video_duration) + 1
frames_written = 0

for sec_i in range(total_seconds):
    cur_time = float(sec_i)
    if cur_time > total_video_duration:
        break

    # Find matching chapter
    ch = chapter_timings[-1]
    for c in chapter_timings:
        if c["start_sec"] <= cur_time < c["end_sec"]:
            ch = c
            break

    ch_progress = min(1.0, max(0.0, (cur_time - ch["start_sec"]) / max(1.0, ch["duration"])))

    # Get base background
    if ch["type"] == "slide_challenge":
        base_img = slide_ch1.copy()
    elif ch["type"] == "slide_growth_loop":
        step_idx = min(5, int(ch_progress * 6))
        base_img = loop_slides[step_idx].copy()
    elif ch["type"] == "screen_scroll":
        raw_screen = preloaded_screens.get(ch["screen"])
        if raw_screen:
            orig_h = raw_screen.size[1]
            max_scroll = max(0, orig_h - HEIGHT)
            t = ch_progress
            ease = (1.0 - np.cos(t * np.pi)) / 2.0
            scroll_y = int(ease * max_scroll)
            base_img = raw_screen.crop((0, scroll_y, WIDTH, scroll_y + HEIGHT))
        else:
            base_img = Image.new("RGB", (WIDTH, HEIGHT), (248, 250, 252))
    else:  # screen_static
        raw_screen = preloaded_screens.get(ch["screen"])
        if raw_screen:
            base_img = raw_screen.crop((0, 0, WIDTH, HEIGHT))
        else:
            base_img = Image.new("RGB", (WIDTH, HEIGHT), (248, 250, 252))

    # Add HUD and Subtitles
    final_img = draw_hud_and_cc(base_img, ch, cur_time, total_video_duration)

    # Convert to BGR bytes once
    bgr_bytes = np.array(final_img)[:, :, ::-1].tobytes()

    # Determine how many frames for this second
    num_frames = FPS if (cur_time + 1.0) <= total_video_duration else int((total_video_duration - cur_time) * FPS)
    for _ in range(num_frames):
        proc.stdin.write(bgr_bytes)
        frames_written += 1

    if sec_i % 15 == 0 or sec_i == total_seconds - 1:
        pct = (cur_time / total_video_duration) * 100
        print(f"Progress: {fmt_time(cur_time)} / {fmt_time(total_video_duration)} ({pct:.1f}%) | {frames_written} frames")

proc.stdin.close()
proc.wait()

print("\n=== STEP 5: VERIFYING OUTPUT VIDEO FILE ===")
if os.path.exists(OUTPUT_MP4):
    size_mb = os.path.getsize(OUTPUT_MP4) / (1024 * 1024)
    print(f"SUCCESS! Master Video created at: {OUTPUT_MP4}")
    print(f"File Size: {size_mb:.2f} MB")

    shutil.copy2(OUTPUT_MP4, DESKTOP_COPY)
    print(f"Direct Desktop Copy created at: {DESKTOP_COPY}")
else:
    print("Error: Output video file was not found!")
    sys.exit(1)
