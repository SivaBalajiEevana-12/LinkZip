const user= require('../models/user');
const link=   require('../models/link');
const click= require('../models/click');
const onClick = async (req: any, res: any) => {
    try {
        const { shortCode } = req.params;

        const linkData = await link.findOne({ shortCode });

        if (!linkData) {
            return res.status(404).json({ message: "Link not found" });
        }

        if (!linkData.isActive) {
            return res.status(410).json({ message: "Link is inactive" });
        }

        if (linkData.expiresAt && linkData.expiresAt < new Date()) {
            return res.status(410).json({ message: "Link has expired" });
        }

        linkData.totalClicks += 1;

        const uniqueClick = await click.findOne({
            linkId: linkData._id,
            ip: req.ip
        });

        if (!uniqueClick) {
            linkData.uniqueClicks += 1;
        }

        await linkData.save();

        await click.create({
            linkId: linkData._id,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            referer: req.headers["referer"]
        });

        return res.redirect(linkData.originalUrl);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
const getLinkClicks = async (req: any, res: any) => {
  try {
    const clicks = await click
      .find({ linkId: req.params.linkId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      clicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch click details",
    });
  }
};
module.exports = { onClick,getLinkClicks };
// module.exports={onClick};
