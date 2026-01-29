export default function FloatingClouds() {
    return (
        <div className="absolute inset-0 z-[-5] pointer-events-none overflow-hidden opacity-40">
            {/* Sliding background container */}
            <div
                className="absolute inset-0 w-[200%] h-full animate-clouds"
                style={{
                    backgroundImage: 'url(/images/cloud.png)',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 100%', // Fit height, let width repeat naturally
                    backgroundPosition: 'left center'
                }}
            />
        </div>
    );
}
